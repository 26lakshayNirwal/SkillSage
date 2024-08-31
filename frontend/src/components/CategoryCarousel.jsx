import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  return (
    <Carousel className=" w-full max-w-xl mx-auto my-20">
      <CarouselContent>
        {category.map((cat, index) => (
          <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
            <Button
              //   onClick={() => searchJobHandler(cat)}
              variant="outline"
              className="rounded-full"
              key={index}
            >
              {cat}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;
