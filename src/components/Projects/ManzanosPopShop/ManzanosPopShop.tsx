"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

import ManzanosPopShopHomeTab from '../ManzanosPopShop/Screenshots/ManzanosPopShop_HomeTab.png';
import ManzanosPopShopPopsTab from '../ManzanosPopShop/Screenshots/ManzanosPopShop_PopsTab.png';
import ManzanosPopShopPopDetails from '../ManzanosPopShop/Screenshots/ManzanosPopShop_PopDetails.png';
import ManzanosPopShopOrders from '../ManzanosPopShop/Screenshots/ManzanosPopShop_Orders.png';

import Privacy from './Privacy';
import Terms from './Terms';
import { SlideNavProps } from '@/types/types';
import Modal from '@/components/Modal';
import FeedbackModal from '@/components/MailForm/FeedbackModal';
import AppImages from '@/constants/images';

export default function ManzanosPopShop({
  showArrows = false,
  nextSlide = () => {},
  prevSlide = () => {},
}: SlideNavProps) {
  const ManzanosPopShopScreenshots = [
    ManzanosPopShopHomeTab,
    ManzanosPopShopPopsTab,
    ManzanosPopShopPopDetails,
    ManzanosPopShopOrders
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

const pathname = usePathname();
const router = useRouter();

  useEffect(() => {
    if (ManzanosPopShopScreenshots.length > 0) {
      const maxSets = Math.ceil(ManzanosPopShopScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [ManzanosPopShopScreenshots.length]);

  useEffect(() => {
    if (pathname === '/manzanos-popshop/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (pathname === '/manzanos-popshop/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/manzanos-popshop/id6747915168", "_blank");
  };

  const handlePlayStoreButtonClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.devzano.manzanospopshop", "_blank");
  };

const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appName: 'Manzanos PopShop',
          firstName: feedback.firstName,
          lastName: feedback.lastName,
          email: feedback.email,
          message: feedback.message
        })
      });

      if (response.ok) {
        alert('Feedback sent successfully!');
        setIsFeedbackModalOpen(false);
        setFeedback({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        alert('Failed to send feedback. Please try again later.');
      }
    } catch (error) {
      alert('Error sending feedback. Please try again later.');
    }
  };

  const handleCloseModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    modalSetter(false);
    if (pathname === '/manzanos-popshop/privacy' || pathname === '/manzanos-popshop/terms') {
      router.push('/manzanos-popshop');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: AppImages.xcode, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: AppImages.swiftui, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: AppImages.expo, alt: 'Expo Logo', link: 'https://docs.expo.dev/' },
    { src: AppImages.firebase, alt: 'Firebase Logo', link: 'https://firebase.google.com/' },
    { src: AppImages.termsConditions, alt: 'Terms and Conditions', onClick: () => router.push('/manzanos-popshop/terms') },
    { src: AppImages.privacyPolicy, alt: 'Privacy Policy', onClick: () => router.push('/manzanos-popshop/privacy') }
  ];

  return (
    <div className="coding-background">
      <div className="title-with-arrows">
        {showArrows && (
          <button className="small-nav-arrow" onClick={prevSlide} aria-label="Previous Project">
            &#10094;
          </button>
        )}
        <h1 style={{ fontSize: 32, margin: 0 }}>
          <a
            href="https://www.rubenmanzano.com/manzanos-popshop"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            Manzanos PopShop
          </a>
        </h1>
        {showArrows && (
          <button className="small-nav-arrow" onClick={nextSlide} aria-label="Next Project">
            &#10095;
          </button>
        )}
      </div>
      <div className="centered-content">
        <div className="button-group">
          <button onClick={handleAppleStoreButtonClick} className="app-button">Apple Store</button>
          &nbsp;
          <button onClick={handlePlayStoreButtonClick} className="app-button">Play Store</button>
          <br />
          <br />
          <button onClick={() => setIsFeedbackModalOpen(true)} className="app-button">Send Feedback</button>
        </div>
        <div className="project">
          <div className="sections-container">
            <div>
              <div className="project-image-container">
                <div className="image-table-background">
                  <table className="rounded-images-table centered-images-table">
                    <tbody>
                      <tr>
                        {Array.from({ length: numberOfImages }).map((_, i) => (
                          <td align="center" key={i}>
                            <Image
                              src={ManzanosPopShopScreenshots[i + currentSet * numberOfImages]}
                              alt={`Manzanos PopShop View ${i + currentSet * numberOfImages}`}
                              width="300"
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="project-description">
                <strong>Shop, collect, and show off your favorite Funko Pops with <span style={{ color: 'slateblue' }}>Manzanos PopShop</span> — a unique storefront powered by passion, built for collectors, and curated straight from my personal vault of iconic vinyl figures.</strong> Whether you're a casual fan or a serious collector it's easy to browse, buy, and build your collection.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Explore the Collection:</strong> Browse through an ever-growing catalog of Funko Pops, including exclusives, chases, limited editions, and hidden gems. Filter by series, exclusives and more — each listing features beautiful images and up-to-date stock info.</li>
                  <li><strong>Secure Checkout with Stripe:</strong> Enjoy fast and secure payments using Stripe. Your orders are processed smoothly, and stock is reserved instantly to ensure you don’t miss out on your favorite Pop.</li>
                  <li><strong>Favorite Your Picks:</strong> Not ready to buy? Mark Pops as favorites and build your dream list. Your favorites are saved to your profile for easy access later.</li>
                  <li><strong>Modern Order Management:</strong> Track your past orders, view full order details (with thumbnails and status), and automatically regain items in your cart if a payment fails or times out.</li>
                  <li><strong>Personalized Profile:</strong> Upload a profile picture, manage your shipping addresses (with nicknames like “Home” or “Work”), and securely update your details at any time. Choose between dark or light mode to match your vibe.</li>
                  <li><strong>One-Tap Sign-In:</strong> Get started with Google or email login — or browse as a guest to explore the shop before signing up. All personal data is stored securely with Supabase.</li>
                </ul>

                <strong><span style={{ color: 'slateblue' }}>Manzanos PopShop</span> isn’t just a store — it’s a celebration of Pop culture. You’re not just buying; you’re adding a story to your shelf. &nbsp; Join the hunt — shop, collect, and celebrate what you love with <span style={{ color: 'slateblue' }}>Manzanos PopShop</span>!</strong>
              </p>
              <div className="logo-container">
                {BuiltWithLogos.map((logo, index) => (
                  <span key={index}>
                    {logo.link ? (
                      <Link href={logo.link}>
                        <Image src={logo.src} alt={logo.alt} className="logo" />
                      </Link>
                    ) : (
                      <Image src={logo.src} alt={logo.alt} className="logo" onClick={logo.onClick} style={{ cursor: 'pointer' }} />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => handleCloseModal(setIsPrivacyModalOpen)}
        title="Privacy Policy"
        contentClassName="modal-content glassy-effect"
      >
        <Privacy />
      </Modal>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => handleCloseModal(setIsTermsModalOpen)}
        title="Terms of Use"
        contentClassName="modal-content glassy-effect"
      >
        <Terms />
      </Modal>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
        appName="Manzanos PopShop"
      />
    </div>
  );
};