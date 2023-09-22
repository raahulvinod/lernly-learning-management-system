import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationShema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'unread',
    },
  },
  { timestamps: true }
);

const NotificationModel: Model<INotification> = mongoose.model(
  'Notification',
  notificationShema
);

export default NotificationModel;
