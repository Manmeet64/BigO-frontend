import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Flashcard {
    _id: string;
    question: string;
    answer: string;
    difficulty: string;
    deck?: string;
}

interface Deck {
    _id: string;
    name: string;
    flashcards: Flashcard[];
    creator: string;
}

interface DeckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateDeck: (deck: Omit<Deck, "_id">) => void;
    userId: string | undefined;
}

const DeckModal: FC<DeckModalProps> = ({
    isOpen,
    onClose,
    onCreateDeck,
    userId,
}) => {
    const [deckName, setDeckName] = useState("");
    const [cards, setCards] = useState<Omit<Flashcard, "_id">[]>([]);
    const [currentCard, setCurrentCard] = useState({
        question: "",
        answer: "",
        difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddCard = () => {
        if (currentCard.question && currentCard.answer) {
            setCards([...cards, currentCard]);
            setCurrentCard({
                question: "",
                answer: "",
                difficulty: "Easy",
            });
        }
    };

    const handleCreateDeck = async () => {
        if (deckName && cards.length > 0 && userId) {
            setIsLoading(true);
            setError(null);

            try {
                const requestBody = {
                    name: deckName,
                    flashcards: cards.map((card) => ({
                        question: card.question,
                        answer: card.answer,
                        difficulty: card.difficulty,
                    })),
                };

                const response = await fetch(
                    `http://localhost:3000/bigo/deck/${userId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                onCreateDeck({
                    name: deckName,
                    flashcards: cards,
                });

                toast.success("Deck created successfully! 🎉");
                onClose();
            } catch (error) {
                setError("Failed to create deck. Please try again.");
                toast.error("Failed to create deck. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[600px] max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create New Deck
                </h2>

                {/* Deck Name Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Deck Name
                    </label>
                    <input
                        type="text"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter deck name"
                    />
                </div>

                {/* Card List */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Cards
                    </h3>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg mb-4"
                        >
                            <p className="font-medium">Q: {card.question}</p>
                            <p className="text-gray-600">A: {card.answer}</p>
                            <p className="text-sm text-gray-500">
                                Difficulty: {card.difficulty}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Add Card Form */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Add New Card
                    </h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={currentCard.question}
                            onChange={(e) =>
                                setCurrentCard({
                                    ...currentCard,
                                    question: e.target.value,
                                })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Question"
                        />
                        <input
                            type="text"
                            value={currentCard.answer}
                            onChange={(e) =>
                                setCurrentCard({
                                    ...currentCard,
                                    answer: e.target.value,
                                })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Answer"
                        />
                        <select
                            value={currentCard.difficulty}
                            onChange={(e) =>
                                setCurrentCard({
                                    ...currentCard,
                                    difficulty: e.target.value as
                                        | "Easy"
                                        | "Medium"
                                        | "Hard",
                                })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <button
                            onClick={handleAddCard}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add Card
                        </button>
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateDeck}
                        disabled={!deckName || cards.length === 0 || isLoading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                                 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <span className="inline-block animate-spin mr-2">
                                    ⌛
                                </span>
                                Creating...
                            </>
                        ) : (
                            "Create Deck"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cards: FC = () => {
    const { userId } = useParams();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/bigo/decks/${userId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch decks");
                }
                const data = await response.json();
                setDecks(data);
                if (data.length > 0) {
                    setSelectedDeck(data[0]); // Select first deck by default
                }
            } catch (error) {
                console.error("Error fetching decks:", error);
                toast.error("Failed to load decks");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDecks();
    }, [userId]);

    const handleDeckSelect = (deck: Deck) => {
        setSelectedDeck(deck);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const handleNextCard = () => {
        if (
            selectedDeck &&
            currentCardIndex < selectedDeck.flashcards.length - 1
        ) {
            setCurrentCardIndex((prev) => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex((prev) => prev - 1);
            setIsFlipped(false);
        }
    };

    const handleCreateDeck = async (newDeck: Omit<Deck, "_id">) => {
        try {
            // Refresh the decks list after creation
            const response = await fetch(
                `http://localhost:3000/bigo/decks/${userId}`
            );
            if (!response.ok) throw new Error("Failed to fetch decks");
            const data = await response.json();
            setDecks(data);
        } catch (error) {
            console.error("Error refreshing decks:", error);
            toast.error("Failed to refresh decks");
        }
    };

    const handleDeleteDeck = async (deckId: string) => {
        try {
            const response = await fetch(
                `http://localhost:3000/bigo/deck/${deckId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete deck");
            }

            // Remove deck from state
            setDecks(decks.filter((deck) => deck._id !== deckId));
            if (selectedDeck?._id === deckId) {
                setSelectedDeck(null);
            }
            toast.success("Deck deleted successfully");
        } catch (error) {
            console.error("Error deleting deck:", error);
            toast.error("Failed to delete deck");
        }
    };

    return (
        <section className="flex flex-row h-screen w-full bg-background">
            <Navbar />
            <div className="flex flex-col flex-1 px-16 pt-8">
                <div className="relative z-50">
                    <ToastContainer />
                </div>

                {/* Header Section with XP and Streak */}
                <div className="flex justify-between items-start mb-10">
                    <div className="flex flex-col space-y-8">
                        <h1 className="text-5xl font-bold text-gray-800">
                            Cards
                        </h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-fit bg-gradient-to-r from-blue-400 to-blue-300 hover:from-blue-500 hover:to-blue-400 
                                     text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 
                                     hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Create New Deck
                        </button>
                    </div>

                    {/* XP and Streak Section */}
                    <div className="flex gap-4">
                        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
                            <div className="bg-yellow-100 rounded-lg p-2">
                                ⭐
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    XP Points
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    1,234
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
                            <div className="bg-orange-100 rounded-lg p-2">
                                🔥
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">
                                    Day Streak
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    7
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-8 flex-1 max-h-[70vh]">
                    {/* Middle Section - Flashcard */}
                    <div className="w-2/3 h-full bg-gradient-to-b from-blue-300 to-blue-200 flex flex-col gap-6 p-8 rounded-lg shadow-lg">
                        {selectedDeck && selectedDeck.flashcards.length > 0 ? (
                            <>
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="flex items-center gap-8">
                                        <button
                                            onClick={handlePrevCard}
                                            disabled={currentCardIndex === 0}
                                            className="p-5 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 
                                                     hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            ←
                                        </button>

                                        <div
                                            className="relative w-[500px] h-[350px] perspective-1000 cursor-pointer"
                                            onClick={() =>
                                                setIsFlipped(!isFlipped)
                                            }
                                        >
                                            <div
                                                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                                                    isFlipped
                                                        ? "rotate-y-180"
                                                        : ""
                                                }`}
                                            >
                                                {/* Front */}
                                                <div
                                                    className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-10 backface-hidden 
                                                              hover:shadow-2xl transition-all duration-300 flex flex-col justify-center items-center"
                                                >
                                                    <h2 className="text-2xl font-bold text-blue-600 mb-8">
                                                        Question
                                                    </h2>
                                                    <p className="text-xl text-gray-700 text-center leading-relaxed">
                                                        {
                                                            selectedDeck
                                                                .flashcards[
                                                                currentCardIndex
                                                            ].question
                                                        }
                                                    </p>
                                                    <div
                                                        className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium
                                                        ${
                                                            selectedDeck
                                                                .flashcards[
                                                                currentCardIndex
                                                            ].difficulty ===
                                                            "Easy"
                                                                ? "bg-green-100 text-green-800"
                                                                : selectedDeck
                                                                      .flashcards[
                                                                      currentCardIndex
                                                                  ]
                                                                      .difficulty ===
                                                                  "Medium"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {
                                                            selectedDeck
                                                                .flashcards[
                                                                currentCardIndex
                                                            ].difficulty
                                                        }
                                                    </div>
                                                </div>

                                                {/* Back */}
                                                <div
                                                    className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-10 backface-hidden 
                                                              rotate-y-180 hover:shadow-2xl transition-all duration-300 flex flex-col justify-center items-center"
                                                >
                                                    <h2 className="text-2xl font-bold text-green-600 mb-8">
                                                        Answer
                                                    </h2>
                                                    <p className="text-xl text-gray-700 text-center leading-relaxed">
                                                        {
                                                            selectedDeck
                                                                .flashcards[
                                                                currentCardIndex
                                                            ].answer
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleNextCard}
                                            disabled={
                                                currentCardIndex ===
                                                selectedDeck.flashcards.length -
                                                    1
                                            }
                                            className="p-5 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 
                                                     hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <p className="text-gray-600 font-medium bg-white px-8 py-3 rounded-full shadow-md">
                                        Card {currentCardIndex + 1} of{" "}
                                        {selectedDeck.flashcards.length}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-xl text-white text-center">
                                    {selectedDeck
                                        ? "This deck has no flashcards yet. Create some!"
                                        : "Select a deck to start studying"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Your Decks */}
                    <div className="w-1/3 bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col rounded-lg overflow-hidden shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Your Decks
                        </h2>
                        <div className="space-y-4 overflow-y-auto flex-1">
                            {decks.map((deck) => (
                                <div
                                    key={deck._id}
                                    onClick={() => handleDeckSelect(deck)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] 
                                              relative group
                                              ${
                                                  selectedDeck?._id === deck._id
                                                      ? "bg-white text-blue-600 shadow-md"
                                                      : "bg-blue-200/50 text-white hover:bg-blue-200/70"
                                              }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">
                                                {deck.name}
                                            </div>
                                            <div className="text-sm opacity-80">
                                                {deck.flashcards.length} cards
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteDeck(deck._id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-full transition-all"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DeckModal */}
                <DeckModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreateDeck={handleCreateDeck}
                    userId={userId}
                />
            </div>
        </section>
    );
};

export default Cards;
