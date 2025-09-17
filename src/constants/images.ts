import type { StaticImageData } from "next/image";

import Logo from "../../public/logo512.png";
// navbar
import MenuIcon from "@/assets/CodingLogos/verticalmenu_icon.png";
import HomeIcon from "@/assets/CodingLogos/home_icon.png";
import AllProjectsIcon from "@/assets/CodingLogos/all_projects.png";
// home icons
import MobileIcon from "@/assets/CodingLogos/mobile.png";
import EmailIcon from "@/assets/CodingLogos/mail.png";
import LinkedInIcon from "@/assets/CodingLogos/linkedin.png";
// app icons
import WatchlistrIcon from "@/assets/CodingLogos/watchlistr_icon.png";
import RecipeRealmIcon from "@/assets/CodingLogos/reciperealm_icon.png";
import EchoExpenseIcon from "@/assets/CodingLogos/echoexpense_icon.png";
import OtakuHiveIcon from "@/assets/CodingLogos/otakuhive_icon.png";
import SunshineKeyWestChallengeIcon from "@/assets/CodingLogos/sunshinekeywestchallenge_icon.png";
import StarshipPixelscapeIcon from "@/assets/CodingLogos/starship_pixelscape_icon.png";
import AutoArchiveIcon from "@/assets/CodingLogos/autoarchive_icon.png";
import StedaIcon from "@/assets/CodingLogos/steda_icon.png";
import ManzanosPopShopIcon from "@/assets/CodingLogos/manzanos_popshop_icon.png";
import LogiqoIcon from "@/assets/CodingLogos/logiqo_icon.png";
// dev icons
import GitHubLightLogo from "@/assets/CodingLogos/github_light.png";
import GitHubDarkLogo from "@/assets/CodingLogos/github_dark.png";
import XcodeLogo from "@/assets/CodingLogos/xcode.png";
import AndroidStudioLogo from "@/assets/CodingLogos/androidstudio.png";
import SwitftUILogo from "@/assets/CodingLogos/swiftui.png";
import SwitftUIORGLogo from "@/assets/CodingLogos/swift_orange.png";
import CoreDataLogo from "@/assets/CodingLogos/coredata.png";
import FirebaseLogo from "@/assets/CodingLogos/firebase.png";
import ExpoLogo from "@/assets/CodingLogos/expodevinv.png";
import ReactLogo from "@/assets/CodingLogos/react.png";
import ReactNativeLogo from "@/assets/CodingLogos/reactnative.png";
import ViteLogo from "@/assets/CodingLogos/vite.png";
import VSLogo from "@/assets/CodingLogos/visualstudio.png";
import jsLogo from "@/assets/CodingLogos/javascript.png";
import mySQLLogo from "@/assets/CodingLogos/mysql.png";
import PrivacyPolicy from "@/assets/CodingLogos/privacy_policy.png";
import TermsConditions from "@/assets/CodingLogos/terms_conditions.png";

type Img = StaticImageData;

const AppImages = {
  logo: Logo as Img,
  // navbar
  menu: MenuIcon as Img,
  home: HomeIcon as Img,
  allProjects: AllProjectsIcon as Img,
  // home icons
  mobile: MobileIcon as Img,
  email: EmailIcon as Img,
  linkedin: LinkedInIcon as Img,
  // app icons
  watchlistr: WatchlistrIcon as Img,
  recipeRealm: RecipeRealmIcon as Img,
  echoExpense: EchoExpenseIcon as Img,
  otakuHive: OtakuHiveIcon as Img,
  sunshineKeyWestChallenge: SunshineKeyWestChallengeIcon as Img,
  starshipPixelscape: StarshipPixelscapeIcon as Img,
  autoArchive: AutoArchiveIcon as Img,
  steda: StedaIcon as Img,
  manzanosPopShop: ManzanosPopShopIcon as Img,
  logiqo: LogiqoIcon as Img,
  // dev icons
  githubLight: GitHubLightLogo as Img,
  githubDark: GitHubDarkLogo as Img,
  xcode: XcodeLogo as Img,
  androidStudio: AndroidStudioLogo as Img,
  swiftui: SwitftUILogo as Img,
  swiftuiOrange: SwitftUIORGLogo as Img,
  coredata: CoreDataLogo as Img,
  firebase: FirebaseLogo as Img,
  expo: ExpoLogo as Img,
  react: ReactLogo as Img,
  reactnative: ReactNativeLogo as Img,
  vite: ViteLogo as Img,
  vs: VSLogo as Img,
  javascript: jsLogo as Img,
  mysql: mySQLLogo as Img,
  privacyPolicy: PrivacyPolicy as Img,
  termsConditions: TermsConditions as Img,
} as const;

export default AppImages;