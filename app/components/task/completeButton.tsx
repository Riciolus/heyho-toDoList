import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <motion.button whileTap={{ scale: isCompleted ? 1 : 0.5 }}>
      <div
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
      </div>
    </motion.button>
  );
};

export default ImportantButton;
