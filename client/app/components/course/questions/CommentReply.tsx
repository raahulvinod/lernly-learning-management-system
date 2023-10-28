import CommentItem from './CommentItem';
import { CourseData, UserData } from '../CourseContentMedia';

export interface CommentReplyProps {
  courseData: CourseData[];
  activeVideo: number;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  handleAnswerSubmit: () => void;
  userData: UserData;
  questionCreationLoading: boolean;
}

const CommentReply: React.FC<CommentReplyProps> = ({
  courseData,
  activeVideo,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  userData,
  questionCreationLoading,
}) => {
  return (
    <>
      <div className="w-full my-3">
        {courseData[activeVideo].questions.map((question, index: number) => (
          <CommentItem
            key={index}
            index={index}
            courseData={courseData}
            activeVideo={activeVideo}
            questionData={question}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            questionCreationLoading={questionCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

export default CommentReply;
