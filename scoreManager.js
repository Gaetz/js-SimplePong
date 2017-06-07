/**
 * Manage game score
 */
class ScoreManager {

    constructor() {
        this.playerScore = 0;
        this.opponentScore = 0;
    }

    /**
     * Player gains a point
     */
    playerMarks() {
        this.playerScore = this.playerScore + 1;
    }

    /**
     * Opponent gains a point
     */
    opponentMarks() {
        this.opponentScore = this.opponentScore + 1;
    }

    /**
     * Reset all scores
     */
    reset() {
        this.playerScore = 0;
        this.opponentScore = 0;
    }

}