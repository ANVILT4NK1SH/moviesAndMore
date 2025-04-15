import { computed, Injectable, signal } from "@angular/core";
import { Review } from "../models/review.model";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviews = signal<Review[]>([]);

  // Constructor to initialize the reviews list from localStorage
  constructor() {
    // Check if reviews exist in localStorage and load them
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      try {
        const parsed = JSON.parse(storedReviews);
        this.reviews.set(parsed);
      } catch (error) {
        console.error('ReviewService: Error parsing localStorage:', error);
      }
    }
  }

  // Return a read-only signal of the reviews list for external access
  getReview(movieId: number) {
    let review = () => this.reviews().find(r => r.id === movieId);

    console.log(review);
    return review;    
  }

  // Compute whether a movie is in the reviews list based on its ID
  isReviewed(movieId: number) {
    return computed(() =>
      this.reviews().some((movie) => movie.id === movieId)
    );
  }

  // Add a movie to the reviews list if it’s not already present
  addReview(review: Review) {
    // Check if the movie is not already favorited
    if (!this.isReviewed(review.id)()) {
      // Update the signal with a new array including the movie
      this.reviews.update((r) => [...r, review]);
      // Persist the updated list to localStorage
      this.saveReviews();
    }
  }

  // Remove a movie from the reviews list by its ID
  removeReview(movieId: number) {
    // Filter out the movie and update the signal
    this.reviews.update((reviews) => {
      const newReviews = reviews.filter((r) => r.id !== movieId);
      console.log(
        'ReviewService: Removed review',
        movieId,
        'New reviews:',
        newReviews
      );
      return newReviews;
    });
    // Persist the updated list to localStorage
    this.saveReviews();
  }

  // Save the current reviews list to localStorage
  private saveReviews() {
    try {
      const reviews = this.reviews();
      localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch (error) {
      console.error('reviewService: Error saving to localStorage:', error);
    }
  }
}
