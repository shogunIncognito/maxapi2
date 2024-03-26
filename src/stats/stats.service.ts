import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { months } from 'src/constants/conts';
import { Stats } from 'src/models/Stats';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stats.name) private statsModel: Model<Stats>) {}
  async getStats() {
    const date = new Date();

    const [, monthNum, yearStr] = new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .split('/');

    const month = months[parseInt(monthNum) - 1];
    const year = parseInt(yearStr);

    const monthsViewsGroup = await this.statsModel.aggregate([
      {
        $match: { year },
      },
      {
        $group: {
          _id: { month: '$month' },
          views: { $sum: '$views' },
        },
      },
    ]);

    const daysViewsGroup = await this.statsModel
      .aggregate([
        {
          $match: { year, month },
        },
        {
          $group: {
            _id: { month: '$month', day: '$day' },
            views: { $sum: '$views' },
          },
        },
      ])
      .sort({ '_id.month': 1, '_id.day': 1 });

    const viewsMonths = monthsViewsGroup.reduce((acc, month) => {
      acc[month._id.month] = month.views;
      return acc;
    }, {});

    const daysMonthViews = daysViewsGroup.reduce((acc, day) => {
      const { day: dayNumber } = day._id;
      acc[dayNumber] = day.views;
      return acc;
    }, {});

    return { viewsMonths, daysMonthViews };
  }

  async addView(dateTime: number) {
    const [day, monthNum, yearStr] = new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(dateTime)
      .split('/');

    const month = months[parseInt(monthNum) - 1];
    const year = parseInt(yearStr);

    const stats = await this.statsModel.findOne({ year, month, day });

    if (stats) {
      stats.views += 1;
      stats.save();
      return;
    }

    this.statsModel.create({ year, month, day, views: 1 });
    return;
  }
}
