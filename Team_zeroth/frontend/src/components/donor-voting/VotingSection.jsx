import { useVoting } from "../../context/VotingContext"

const VotingSection = () => {
  const { votingData, userVote, handleVote } = useVoting()

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center leading-relaxed">
        {votingData.milestone.description}
      </h2>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleVote("yes")}
          disabled={userVote !== null}
          className={`flex-1 max-w-xs py-4 rounded-lg font-semibold text-lg transition-all ${
            userVote === "yes"
              ? "bg-orange-500 text-white shadow-lg scale-105"
              : userVote === null
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          YES
        </button>

        <button
          onClick={() => handleVote("no")}
          disabled={userVote !== null}
          className={`flex-1 max-w-xs py-4 rounded-lg font-semibold text-lg transition-all ${
            userVote === "no"
              ? "bg-red-500 text-white shadow-lg scale-105"
              : userVote === null
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          NO
        </button>
      </div>
    </div>
  )
}

export default VotingSection