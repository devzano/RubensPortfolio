"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

import WelcomeView from '../RecipeRealm/Screenshots/RecipeRealm_WelcomeView.png';
import HomeView from '../RecipeRealm/Screenshots/RecipeRealm_HomeView.png';
import OpenBookView from '../RecipeRealm/Screenshots/RecipeRealm_OpenBookView.png';
import OpenBookDetailView from '../RecipeRealm/Screenshots/RecipeRealm_OpenBookDetailView.png';
import DetailsView from '../RecipeRealm/Screenshots/RecipeRealm_DetailsView.png';
import Details2View from '../RecipeRealm/Screenshots/RecipeRealm_Details2View.png';
import EditDetailsView from '../RecipeRealm/Screenshots/RecipeRealm_EditDetailsView.png';
import EditDetails2View from '../RecipeRealm/Screenshots/RecipeRealm_EditDetails2View.png';
import NewRecipeView from '../RecipeRealm/Screenshots/RecipeRealm_NewRecipeView.png';
import NewRecipeImportView from '../RecipeRealm/Screenshots/RecipeRealm_NewRecipeImportView.png';
import NewRecipeImageView from '../RecipeRealm/Screenshots/RecipeRealm_NewRecipeImageView.png';
import NewRecipeBookImageView from '../RecipeRealm/Screenshots/RecipeRealm_NewRecipeBookImageView.png';
import NewBookView from '../RecipeRealm/Screenshots/RecipeRealm_NewBookView.png';
import RecipeContextOptionsView from '../RecipeRealm/Screenshots/RecipeRealm_RecipeContextOptionsView.png';
import RecipeBookContextOptionsView from '../RecipeRealm/Screenshots/RecipeRealm_RecipeBookContextOptionsView.png';
import RecipeBookContextView from '../RecipeRealm/Screenshots/RecipeRealm_RecipeBookContextView.png';
import RandomBannerView from '../RecipeRealm/Screenshots/RecipeRealm_RandomBannerView.png';
import OptionsView from '../RecipeRealm/Screenshots/RecipeRealm_OptionsView.png';
import ChangeTintView from '../RecipeRealm/Screenshots/RecipeRealm_ChangeTintView.png';
import ChangeThemeView from '../RecipeRealm/Screenshots/RecipeRealm_ChangeThemeView.png';

import Terms from './Terms';
import Privacy from './Privacy';
import { SlideNavProps } from '@/types/types';
import Modal from '@/components/Modal';
import FeedbackModal from '@/components/MailForm/FeedbackModal';
import AppImages from '@/constants/images';

export default function RecipeRealm({
  showArrows = false,
  nextSlide = () => { },
  prevSlide = () => { },
}: SlideNavProps) {

  const RecipeRealmScreenshots = [
    WelcomeView,
    HomeView,
    OpenBookView,
    OpenBookDetailView,
    DetailsView,
    Details2View,
    EditDetailsView,
    EditDetails2View,
    NewRecipeView,
    NewRecipeImportView,
    NewRecipeImageView,
    NewRecipeBookImageView,
    NewBookView,
    RecipeBookContextView,
    RecipeBookContextOptionsView,
    RecipeContextOptionsView,
    RandomBannerView,
    OptionsView,
    ChangeTintView,
    ChangeThemeView
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (RecipeRealmScreenshots.length > 0) {
      const maxSets = Math.ceil(RecipeRealmScreenshots.length / calculateNumberOfImages());
      const interval = setInterval(() => {
        setCurrentSet(prevSet => (prevSet + 1) % maxSets);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [RecipeRealmScreenshots.length]);

  useEffect(() => {
    if (pathname === '/reciperealm/privacy') {
      setIsPrivacyModalOpen(true);
    } else {
      setIsPrivacyModalOpen(false);
    }

    if (pathname === '/reciperealm/terms') {
      setIsTermsModalOpen(true);
    } else {
      setIsTermsModalOpen(false);
    }
  }, [pathname]);

  const handleAppleStoreButtonClick = () => {
    window.open("https://apps.apple.com/us/app/reciperealm/id6458877177", "_blank");
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
          appName: 'RecipeRealm',
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
    if (pathname === '/reciperealm/privacy' || pathname === '/reciperealm/terms') {
      router.push('/reciperealm');
    }
  };

  const calculateNumberOfImages = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const numberOfImages = calculateNumberOfImages();

  const BuiltWithLogos = [
    { src: AppImages.githubLight, alt: 'GitHub Logo', link: 'https://github.com/devzano' },
    { src: AppImages.xcode, alt: 'Xcode Logo', link: 'https://developer.apple.com/xcode/' },
    { src: AppImages.coredata, alt: 'CoreData Logo', link: 'https://developer.apple.com/documentation/coredata/' },
    { src: AppImages.swiftui, alt: 'SwiftUI Logo', link: 'https://developer.apple.com/xcode/swiftui/' },
    { src: AppImages.termsConditions, alt: 'Terms and Conditions', onClick: () => router.push('/reciperealm/terms') },
    { src: AppImages.privacyPolicy, alt: 'Privacy Policy', onClick: () => router.push('/reciperealm/privacy') }
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
            href="https://apps.apple.com/us/app/reciperealm/id6458877177"
            target="_blank"
            rel="noopener noreferrer"
            className="section-title"
          >
            RecipeRealm
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
                            <Image src={RecipeRealmScreenshots[i + currentSet * numberOfImages]}
                              alt={`RecipeRealm View ${i + currentSet * numberOfImages}`}
                              width="300" />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="project-description">
                <strong>Discover a world of flavors with <span style={{ color: 'cornflowerblue' }}>RecipeRealm</span> — your go-to app for creating, saving, and sharing culinary creations with ease.</strong> Whether you’re a home cook or a seasoned chef, RecipeRealm helps you organize your recipes beautifully, explore new dishes, and customize your cooking journey.

                <br /><br />

                <strong>Features:</strong>
                <ul className="features-list">
                  <li><strong>Store & Browse:</strong> Save your favorite recipes, from appetizers to desserts, with prep and cook times, images, ingredients, and step-by-step instructions — all in one place.</li>
                  <li><strong>In-App Browser & Ingredient Capture:</strong> Search for new recipes directly through the app's browser. Found one you like? Tap the scan button to quickly grab the ingredient list right from the webpage.</li>
                  <li><strong>Images Made Easy:</strong> Upload photos from your library, take new ones, or use Google image search to find the perfect picture for your recipe.</li>
                  <li><strong>Edit Anytime:</strong> Need to make updates? Edit recipes effortlessly — update any section, tweak steps, or crop photos as needed.</li>
                  <li><strong>Step-by-Step Tracking:</strong> Stay organized while cooking. Mark off ingredients and steps as you go, then reset and reuse for your next cooking session.</li>
                  <li><strong>Quick Search & Filters:</strong> Easily find your saved recipes using the search bar. Filter by cook time or cuisine type to discover your favorites faster.</li>
                  <li><strong>Dietary Preferences:</strong> Tag recipes for specific dietary needs like gluten-free, sugar-free, and more for easy sorting.</li>
                  <li><strong>Share the Flavor:</strong> Share your creations with friends via built-in sharing options. Recipients can copy and import recipes directly into their app — perfect for collaborative cooking!</li>
                  <li><strong>Easy Additions:</strong> Quickly import recipes by copying details, including images from your clipboard, directly into the app.</li>
                  <li><strong>RecipeRealm Community:</strong> Connect with fellow food enthusiasts, discover new dishes, and share your favorite creations with an active and inspiring community.</li>
                  <li><strong>Recipe Assistant (Exclusive):</strong> Powered by OpenAI, the Chefs Assistant helps answer your cooking questions. Community members enjoy up to 12 messages per day for personalized guidance in the kitchen.</li>
                  <li><strong>Random Recipe Banner:</strong> Get inspired each time you open the app with a random featured recipe. Tap to view details, copy, and import it seamlessly.</li>
                  <li><strong>My Recipe Starter:</strong> Enjoy one of my personal recipes included at install — a tasty way to jumpstart your culinary journey.</li>
                  <li><strong>Recipe Books:</strong> Organize recipes into customizable books. Drag, drop, and manage your collection intuitively with easy sorting actions.</li>
                  <li><strong>Color UI:</strong> Personalize your app experience by choosing your preferred tint color for a look that matches your style.</li>
                </ul>

                <strong>Your kitchen adventure awaits.</strong>
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
        appName="RecipeRealm"
      />
    </div>
  );
};