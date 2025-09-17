export type SlideNavProps = {
  showArrows?: boolean;
  nextSlide?: () => void;
  prevSlide?: () => void;
};

export type Feedback = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};