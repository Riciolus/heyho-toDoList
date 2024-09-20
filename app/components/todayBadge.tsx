import { getDateFormattedLong, isTodayDate } from "../lib/datetime";

const TodayBadge = ({ createdAt }: { createdAt: string }) => {
  return (
    <div className="flex gap-3">
      <p className="text-gray-300">
        {createdAt && getDateFormattedLong(createdAt)}
      </p>
      {createdAt && isTodayDate(createdAt) && (
        <p className="flex items-center justify-center bg-orange-400 px-1 tracking-tighter text-black text-xs rounded-[0.210rem]  font-bold">
          Today
        </p>
      )}
    </div>
  );
};

export default TodayBadge;
