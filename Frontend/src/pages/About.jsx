
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  Globe,
  ArrowRight,
  Heart,
  Target,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Common/Footer";

const About = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trust & Security",
      description:
        "Your data and transactions deserve care. We aim to make every shopping experience safe and reliable.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "We focus on quality and helping customers discover products that suit their everyday needs.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "A good shopping experience starts with understanding customers and making things easier for them.",
    },
    {
      icon: Globe,
      title: "A World of Choices",
      description:
        "Explore a variety of products across categories, all from one convenient shopping destination.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      name: "Emily Davis",
      role: "Head of Customer Experience",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              About ShopEase
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Shopping should feel
              <span className="block text-gray-500">
                simple and personal.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              We believe finding the right product should be easy.
              ShopEase brings different products and categories together
              in one convenient place, making everyday shopping easier
              to explore.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Explore products
                <ArrowRight size={17} />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center rounded-md border border-gray-300 px-6 py-3.5 text-sm font-semibold transition hover:border-black"
              >
                Our story
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="overflow-hidden rounded-xl bg-gray-100"
          >
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="A team working together"
              className="h-72 w-full object-cover sm:h-96 lg:h-[450px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="scroll-mt-8 bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              How it started
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our story
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-600">
              <p>
                ShopEase is built around a simple idea: online shopping
                should be convenient, easy to understand, and enjoyable.
              </p>

              <p>
                Finding the right product can sometimes feel complicated.
                We want to make that process more straightforward by
                bringing products from different categories together
                in one place.
              </p>

              <p>
                From browsing products to discovering something new,
                our goal is to create a clean and welcoming shopping
                experience that puts the customer first.
              </p>
            </div>

            <div className="mt-8 flex items-start gap-4 border-l-2 border-black pl-5">
              <Target size={23} className="mt-1 shrink-0" />

              <div>
                <h3 className="font-semibold">Our mission</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Make everyday shopping simpler, more convenient,
                  and accessible through a thoughtful online experience.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <img
              src="https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Discovering products while shopping"
              className="h-72 w-full rounded-xl bg-gray-100 object-cover sm:h-96"
            />
          </motion.div>

        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              What matters to us
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The values behind our store
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              The principles that guide how we think about products,
              service, and the shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-400"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
                  <value.icon size={22} />
                </div>

                <h3 className="text-lg font-semibold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                The people behind ShopEase
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Meet our team
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-600">
              A team working toward a more convenient and enjoyable
              online shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-5 text-gray-500">
            Team profiles are sample content. Update names and photos
            to match your actual team before publishing.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-xl bg-black px-6 py-10 text-white sm:px-10 sm:py-14 md:flex-row md:items-center">

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <ShoppingBag size={17} />
              Discover ShopEase
            </div>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Ready to find something you love?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-300">
              Explore our collection and discover products for your
              everyday needs.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Start shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
