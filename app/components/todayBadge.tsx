import { getDateFormattedLong, isTodayDate } from "../lib/datetime";

const TodayBadge = ({
  createdAt,
  isCompleted,
}: {
  createdAt: string;
  isCompleted: boolean;
}) => {
  return (
    <div className="flex tablet:gap-3 gap-1.5">
      <p className={isCompleted ? "text-neutral-400" : "text-gray-300"}>
        {createdAt && getDateFormattedLong(createdAt)}
      </p>
      {createdAt && isTodayDate(createdAt) && (
        <p
          className={`${
            isCompleted ? "bg-orange-400/50" : "bg-orange-400"
          } flex items-center justify-center px-1 tracking-tighter text-black text-xs rounded-[0.210rem]  font-bold`}
        >
          Today
        </p>
      )}
    </div>
  );
};

export default TodayBadge;
