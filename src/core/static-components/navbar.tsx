/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Navbar as NavbarNext,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  ButtonGroup,
  User,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Tooltip,
  DropdownItem,
  useDisclosure
} from '@nextui-org/react';

import { useOnClickOutside } from 'usehooks-ts';

import {
  BsFillChatLeftDotsFill,
  BsClockFill,
  BsArrowRightCircle,
  BsFillGearFill,
  BsFillFilterSquareFill,
  BsEnvelope,
  BsYelp,
  BsQuestionCircle,
  BsGear
} from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { IMenuItemsNavbar, LayoutLanguage } from '@/models/common';
import { useDispatch, useSelector } from 'react-redux';
import { MdAttachMoney, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';

import PricingModal from '@/modules/pricing/pages';
import { setCurrentLayoutLanguage } from '@/redux/core/core-slice';
import { RootState } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import VerifyEmail from './verify-email';
import FeedbackModal from './feedback-modal';
import logo from '../../assets/images/aizadə.png';

// generate a documentation for the Navbar component
/**
 * The Navbar component is responsible for rendering the application's navigation bar.
 * It includes a logo, a menu, and a user profile section.
 * The component also provides a language selection option and a feedback modal.
 * Additionally, the component displays buttons for user interaction and navigation.
 * @component
 * @returns {JSX.Element} The Navbar component.
 */

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuItems: IMenuItemsNavbar[] = [
    {
      label: t('chat'),
      path: 'chat',
      icon: <BsFillChatLeftDotsFill />
    },
    {
      label: t('tariffs'),
      path: 'pricing',
      icon: <BsFillFilterSquareFill />
    },
    {
      label: t('settings'),
      path: 'settings',
      icon: <BsFillGearFill />
    }
  ];

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentLayoutLanguage } = useSelector(
    (state: RootState) => state.core
  );

  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: pricingIsOpen,
    onOpen: pricingOnOpen,
    onOpenChange: pricingOnOpenChange
  } = useDisclosure();

  const {
    isOpen: feedBackModalIsOpen,
    onOpen: feedBackModalOnOpen,
    onOpenChange: feedBackModaOnOpenChange
  } = useDisclosure();
  const navRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleOutSideClick = () => {
    setIsMenuOpen(false);
  };

  const currentLanguageFlag = (id: string) => {
    switch (id) {
      case LayoutLanguage?.Azerbaijani:
        return <img width={22} alt="uk flag" src="/flags/az-flag.svg" />;

      case LayoutLanguage?.English:
        return <img width={22} alt="uk flag" src="/flags/en-flag.svg" />;
      case LayoutLanguage?.Russian:
        return <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />;
      default:
        return <img width={22} alt="uk flag" src="/flags/global-flag.svg" />;
    }
  };

  useOnClickOutside(navRef, handleOutSideClick);

  /**
   * @component Navbar - The Navbar component is responsible for rendering the application's navigation bar.
   * It includes a logo, a menu, and a user profile section.
   * The component also provides a language selection option and a feedback modal.
   * Additionally, the component displays buttons for user interaction and navigation.
   * @returns {JSX.Element} The Navbar component.
   */
  return (
    <>
      <NavbarNext
        className="z-10  bg-black/30 backdrop-blur-md"
        maxWidth="full"
        isBlurred={false}
        position="static"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        disableAnimation
        onClick={handleOutSideClick}
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarContent className="lg:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">Ai-zade</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden lg:flex gap-4 z-10" justify="start">
          <div
            onClick={() => navigate('/chat')}
            className="cursor-pointer"
            aria-hidden
          >
            <NavbarBrand>
              <img src={logo} className="h-[48px] w-[48px]" alt="" />
            </NavbarBrand>
          </div>
        </NavbarContent>
        <NavbarContent className=" hidden lg:flex gap-4 " justify="center">
          <ButtonGroup className="!rounded-none">
            <Button
              className={` w-40 !rounded-none text-white bg-transparent h-12  ${
                location.pathname.includes('chat')
                  ? ' border-b-1 border-white'
                  : ''
              }`}
              onClick={() => {
                navigate('/chat');
              }}
              title="Chat"
              aria-label="Chat"
              startContent={<BsFillChatLeftDotsFill size={17} />}
            >
              {t('simpleChat')}
            </Button>
            <Button
              className={` w-40 !rounded-none text-white bg-transparent h-12  ${
                location.pathname.includes('assistant')
                  ? ' border-b-1 border-white'
                  : ''
              }`}
              onClick={() => {
                navigate('/assistant-home');
              }}
              startContent={<BsYelp size={17} />}
              aria-label="Assistant"
              title="Assistant"
            >
              {t('assistant')}
            </Button>
            <Tooltip
              className="hidden sm:block"
              placement="bottom"
              content={t('itIsBeingPrepared')}
            >
              <Button
                className={`isDisabled text-white w-40 bg-transparent h-12  ${location.pathname.includes(
                  'catalyst'
                )}`}
                startContent={<BsClockFill color="white" size={17} />}
                aria-label="Catalyst"
                title="Catalyst"
              >
                {t('catalyst')}
              </Button>
            </Tooltip>
          </ButtonGroup>
        </NavbarContent>
        <NavbarContent
          style={{
            marginRight: '-23px'
          }}
          justify="end"
        >
          <NavbarItem className=" p-1 px-2 sm:px-3 flex gap-2 items-center justify-between">
            <Dropdown
              role="menu"
              classNames={{
                content: 'min-w-[auto] w-[80px]'
              }}
            >
              <DropdownTrigger>
                <Button size="sm" className="capitalize bg-transparent">
                  {currentLanguageFlag(currentLayoutLanguage)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={currentLayoutLanguage}
                onSelectionChange={(e: any) => {
                  dispatch(setCurrentLayoutLanguage(e?.currentKey));
                  i18n?.changeLanguage(e?.currentKey);
                  window.location.reload();
                }}
              >
                <DropdownItem key={LayoutLanguage?.Azerbaijani}>
                  <img width={22} alt="az flag" src="/flags/az-flag.svg" />
                </DropdownItem>
                <DropdownItem key={LayoutLanguage?.English}>
                  <img width={22} alt="en flag" src="/flags/en-flag.svg" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {!user.verified && (
              <Tooltip
                className="hidden sm:block"
                placement="bottom"
                content={t('emailVerify')}
              >
                <Button
                  onClick={onOpen}
                  size="sm"
                  isIconOnly
                  aria-label="email verify"
                  title="Email verify"
                  className="bg-transparent rounded-full flex "
                >
                  <BsEnvelope
                    className="cursor-pointer animate-pulse"
                    color="white"
                    size={22}
                  />
                </Button>
              </Tooltip>
            )}
            <Button
              onClick={feedBackModalOnOpen}
              size="sm"
              isIconOnly
              aria-label="feedback"
              title="Feedback"
              className="bg-transparent rounded-full flex "
            >
              <BsQuestionCircle color="white" size={22} />
            </Button>
            <User
              name={user ? `${user.firstName} ${user.lastName}` : t('empty')}
              description={user.email || t('empty')}
              avatarProps={{
                src: `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
              }}
              className="hidden sm:flex text-white"
            />
            <Dropdown className="">
              <DropdownTrigger className="">
                <div>
                  <MdOutlineKeyboardArrowDown
                    className="cursor-pointer"
                    color="white"
                    size={20}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu className=" " aria-label="Static Actions">
                <DropdownItem
                  className=" "
                  onClick={pricingOnOpen}
                  key="pricing"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <MdAttachMoney /> {t('tariffs')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/cabinet');
                  }}
                  key="cabinet"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <AiOutlineUser /> {t('cabinet')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/settings');
                  }}
                  key="settings"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <BsGear /> {t('settings')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    navigate('/reports');
                  }}
                  key="reports"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <TbReportAnalytics /> {t('reports')}
                  </p>
                </DropdownItem>
                <DropdownItem
                  className=" "
                  onClick={() => {
                    localStorage.removeItem('userToken');
                    navigate('/login');
                  }}
                  key="logout"
                >
                  <p className="flex items-center  m-0 gap-2">
                    <BsArrowRightCircle /> {t('logOut')}
                  </p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="md:hidden items-start pt-3 sm:pt-4 mt-0 sm:mt-4 md:mt-1">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className="flex items-start"
              key={`${item}-${index}`}
            >
              <Button
                aria-label="Navbar Menu Item"
                title="Navbar Menu Item"
                className="w-full px-1 flex bg-transparent items-center font-medium"
                onClick={() => {
                  navigate(`/${item.path}`);
                }}
              >
                {item.icon} {item.label}
              </Button>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarNext>
      {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
      {feedBackModalIsOpen && (
        <FeedbackModal
          onOpenChange={feedBackModaOnOpenChange}
          isOpen={feedBackModalIsOpen}
        />
      )}
      {pricingIsOpen && (
        <PricingModal
          onOpenChange={pricingOnOpenChange}
          isOpen={pricingIsOpen}
        />
      )}
    </>
  );
}
