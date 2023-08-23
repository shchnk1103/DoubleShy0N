import { pokemonScoreInfo } from "@/utils/pokemon";
import { FaStar } from "react-icons/fa";

type Props = {
  totalScore: number;
  totalScoreTemporarily: number;
};

const PokemonScoreResult = ({ totalScore, totalScoreTemporarily }: Props) => {
  return (
    <div className="flex gap-4 lg:flex-col lg:w-1/4">
      <div
        className={
          "h-full filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-center flex-col gap-6"
        }
      >
        <span>正常得分</span>

        <div className="relative -z-20 h-24 w-24">
          <FaStar className="w-28 h-28 -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />

          {pokemonScoreInfo(totalScore) && (
            <span
              className={
                "blue_gradient font-bold text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[30px] text-center font-serif"
              }
            >
              {pokemonScoreInfo(totalScore)[0]}
            </span>
          )}
        </div>

        <span className="w-full flex-center gap-1 font-semibold">
          {totalScore} <span className="text-gray-500 text-sm"> /70</span>
        </span>
      </div>

      <div
        className={
          "h-full filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-center flex-col gap-6"
        }
      >
        <span>本周临时分</span>

        <div className="relative -z-20 h-24 w-24">
          <FaStar className="w-28 h-28 -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />

          {pokemonScoreInfo(totalScoreTemporarily) && (
            <span
              className={
                "blue_gradient font-bold text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[30px] text-center font-serif"
              }
            >
              {pokemonScoreInfo(totalScoreTemporarily)[0]}
            </span>
          )}
        </div>

        <span className="w-full flex-center gap-1 font-semibold">
          {totalScoreTemporarily}{" "}
          <span className="text-gray-500 text-sm"> /70</span>
        </span>
      </div>
    </div>
  );
};

export default PokemonScoreResult;
