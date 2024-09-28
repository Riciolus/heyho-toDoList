import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ImportantButton = ({
  isCompleted,
  isImportant,
  taskId,
  handleImportance,
}: {
  isCompleted: boolean;
  isImportant: boolean;
  taskId: string;
  handleImportance: (taskId: string, toStatus: boolean) => void;
}) => {
  return (
    <button
      className={`${
        isCompleted ? "cursor-not-allowed" : "active:animate-ping "
      } `}
    >
      {isImportant ? (
        <FaStar
          onClick={() => {
            if (!isCompleted) {
              handleImportance(taskId, false);
            }
          }}
          className={`${
            isCompleted ? "fill-neutral-400" : "fill-pink-300"
          }  tablet:w-4 tablet:h-4 w-5 h-5`}
        />
      ) : (
        <FaRegStar
          onClick={() => {
            if (!isCompleted) {
              handleImportance(taskId, true);
            }
          }}
          className={`${
            isCompleted && "fill-neutral-400"
          } tablet:w-4 tablet:h-4 w-5 h-5`}
        />
      )}
    </button>
  );
};

export default ImportantButton;
