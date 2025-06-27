import woman1 from '../../assets/images/woman1.jpg';
import woman2 from '../../assets/images/woman2.jpg';
import woman3 from '../../assets/images/woman3.jpg';
import man1 from '../../assets/images/man1.jpg';
import man2 from '../../assets/images/man2.jpg';
import man3 from '../../assets/images/man3.jpg';

type Testimonial = {
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
  carRented: string;
};

export const testimonialsData: Testimonial[] = [
  {
    name: "Faith Mwende",
    location: "Nairobi, Kenya",
    image: woman1,
    rating: 5,
    text: "Very reliable service! The car was delivered clean and on time. I used it for a weekend trip to Naivasha. Highly recommend!",
    carRented: "Toyota Axio"
  },
  {
    name: "Kevin Otieno",
    location: "Kisumu, Kenya",
    image: man1,
    rating: 5,
    text: "Smooth booking and excellent support. The Mercedes was spotless and perfect for my business meetings.",
    carRented: "Mercedes-Benz C200"
  },
  {
    name: "Sharon Wanjiku",
    location: "Nakuru, Kenya",
    image: woman2,
    rating: 5,
    text: "Used their SUV for a family trip. Spacious, comfortable, and the team was super helpful.",
    carRented: "Toyota Highlander"
  },
  {
    name: "Brian Kiprotich",
    location: "Eldoret, Kenya",
    image: man2,
    rating: 5,
    text: "Booked last-minute for a weekend getaway. The car was well-maintained and ready to go!",
    carRented: "Subaru Forester"
  },
  {
    name: "Mercy Achieng",
    location: "Mombasa, Kenya",
    image: woman3,
    rating: 5,
    text: "Fantastic service! I rented a convertible for the coast—everything was perfect.",
    carRented: "BMW 4 Series Convertible"
  },
  {
    name: "Dennis Njoroge",
    location: "Thika, Kenya",
    image: man3,
    rating: 5,
    text: "I needed a small car urgently and they delivered in under two hours. Super friendly staff!",
    carRented: "Toyota Vitz"
  }
];
