import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { Movie } from '../../../../shared/models/movie.model';
import { ReviewService } from '../../../../shared/services/review.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { Review } from '../../../../shared/models/review.model';

@Component({
  selector: 'app-movie-details',
  imports: [SharedModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieService = inject(MovieService);
  reviewService = inject(ReviewService);
  isReviewing = false;
  reviewInput: string = '';

  
  isComponentVisible = signal(false);
  movie = input.required<Movie>();
  close = output<void>();
  // Compute whether the current movie is reviewed
  // What computed() Does:
  // It defines a read-only signal whose value is computed based on other signals or values.
  // The computation is reactive: if any signal used in the computation changes, the computed signal automatically recalculates and updates.
  isReviewed = computed(() => this.reviewService.isReviewed(this.movie().id)());

  review = computed(() => this.reviewService.getReview(this.movie().id)())
  

  closeBtnHandler() {
    this.close.emit();
  }

  whereToViewBtnHandler() {
    const query = `where to view ${this.movie()?.title || ''} `;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;

    window.open(searchUrl, '_blank');
  }

  reviewFormToggleHandler(){
    this.isReviewing = !this.isReviewing
  }

  submitClickHandler(){
    if(this.isReviewed()){
      this.deleteBtnHandler()
    }
    let newReview: Review = {text: this.reviewInput, id: this.movie().id}
    this.reviewService.addReview(newReview)
    this.isReviewing = false
    this.reviewInput = ''
  }

  clearBtnHandler(){
    this.reviewInput = ''
  }

  deleteBtnHandler(){
    this.reviewService.removeReview(this.review()!.id)
  }

  editBtnHandler(){
    const id = this.review()!.id;
    this.reviewInput = this.review()!.text;
    this.isReviewing = true
  }
}
