import { PresentationContent } from '../../../content';
import { SlideProps } from '@/app/components/Slide';

const emptySlide: SlideProps = {
  title: '',
  content: [],
  withCode: false,
  type: 'default',
};

export const getTotalSlidesNumber = () => PresentationContent.slides.length;

export const getPresentationTitle = () => PresentationContent.title;

export const getSlideContent = (slide: number): SlideProps => {
  if (slide < 1 || slide > PresentationContent.slides.length) {
    return emptySlide;
  }
  const data = PresentationContent.slides[slide - 1];
  const content: SlideProps = {
    title: data.title,
    content: data.content,
    withCode: false,
  };
  if (data.codeExample) {
    content.withCode = true;
    content.code = data.codeExample;
  }
  return content;
};
