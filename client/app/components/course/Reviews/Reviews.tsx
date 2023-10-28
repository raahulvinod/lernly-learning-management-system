import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import { format } from 'timeago.js';

import { CommentData, UserData } from '../CourseContentMedia';

interface ReviewProps {
  review: {
    comment: string;
    commentReplies: CommentData[];
    createdAt: string;
    rating: number;
    updatedAt: string;
    user: UserData;
    _id: string;
  };
}

const Reviews: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="w-full flex gap-4">
      <div className="ml-4">
        <Image
          src={review?.user.avatar ? review?.user.avatar.url : ''}
          width={50}
          height={50}
          alt="profile"
          className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
        />
      </div>
      <div className="w-[80%] ml-2 mb-2">
        <h1 className="text-lg font-semibold dark:text-gray-100">
          {review?.user.name}
        </h1>
        <Ratings rating={review.rating} />
        <p className="mt-2 dark:text-gray-300">{review.comment}</p>
        <small>{format(review.createdAt)}</small>
      </div>
    </div>
  );
};

export default Reviews;
