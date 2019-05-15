import React from 'react'

const Reviews = () => {
  return (
    <div className="review-sect__container">
      <div className="container review-sect__box">
        <div className="row review-sect__quotes testimonial-container-row">
          <div className="review-sect__card col-sm">
            <p>
              HabitLite has improved my productivity by an order of magnitude.
              Since I has started to use the app I feel more productive.
            </p>
            <img
              className="review-sect__image"
              src="images/profile-1.jpg"
              alt=""
            />
            <p className="review-sect__name">James Peters</p>
            <p className="review-sect__title">Software Engineer</p>
          </div>

          <div className="review-sect__card testimonial-card-center col-sm">
            <p>
              HabitLite has improved our my productivity by an order of
              magnitude. Since I has started to use the app I feel more
              productive.
            </p>
            <img
              className="review-sect__image"
              src="images/profile-2.jpg"
              alt=""
            />
            <p className="review-sect__name">Tom McKenzie</p>
            <p className="review-sect__title">Writer</p>
          </div>

          <div className="review-sect__card col-sm">
            <p>
              HabitLite has improved my productivity by an order of magnitude.
              Since I has started to use the app I feel more productive.
            </p>
            <img
              className="review-sect__image"
              src="images/profile-3.jpg"
              alt=""
            />
            <p className="review-sect__name">Lana Boyd</p>
            <p className="review-sect__title">Yoga Instructor</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
