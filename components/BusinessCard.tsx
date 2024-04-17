import BusinessCardBackImg from '@/assets/business_card__back.png';
import BusinessCardFrontImg from '@/assets/business_card__front.png';
import { MotionBox } from '@/components/animation/MotionBox';
import { CaishCloudDetails } from '@/constants/business';
import { openUrlInNewTab } from '@/helpers';
import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Image } from '@chakra-ui/next-js';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal
} from '@chakra-ui/react';
import { useMotionValue } from 'framer-motion';
import React, { MouseEvent } from 'react';
import { BsEnvelopeFill } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';

type BusinessCardProps = {
  side: 'back' | 'front';
};

export default function BusinessCard(props: BusinessCardProps) {
  const store = useStore();

  const [backText, setBackText] = React.useState('');
  const [businessCardText, setBusinessCardText] = React.useState('');
  const [frontText, setFrontText] = React.useState('');
  const [popoverHeaderText, setPopoverHeaderText] = React.useState('');

  const businessCardRef = React.useRef<HTMLDivElement>(null);

  // Animation variables
  const businessCardX = useMotionValue(0);
  const businessCardY = useMotionValue(0);

  // Update text when language changes
  React.useEffect(() => {
    setBackText(i18n.t('back'));
    setBusinessCardText(i18n.t('business_card'));
    setFrontText(i18n.t('front'));
    setPopoverHeaderText(i18n.t('business_card_links'));
  }, [store.locale]);

  // Handles what happens when the mouse moves over the given element
  function handleOnMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!businessCardRef.current) return;

    const box = businessCardRef.current.getBoundingClientRect();

    const animationConstraintX = 20;
    const animationConstraintY = 20;
    const calcX =
      -(event.clientY - box.y - box.height / 2) / animationConstraintX;
    const calcY =
      (event.clientX - box.x - box.width / 2) / animationConstraintY;

    businessCardX.set(calcX);
    businessCardY.set(calcY);
  }

  // The business card image component
  function BusinessCardImage() {
    return (
      <Image
        alt={`${businessCardText} - ${
          props.side === 'back' ? backText : frontText
        }`}
        borderRadius={12}
        h="auto"
        priority={true}
        src={props.side === 'back' ? BusinessCardBackImg : BusinessCardFrontImg}
        w="100%"
      />
    );
  }

  return (
    <MotionBox
      borderRadius={12}
      cursor="pointer"
      onMouseLeave={() => {
        businessCardX.set(0);
        businessCardY.set(0);
      }}
      onMouseMove={(e) => handleOnMouseMove(e)}
      ref={businessCardRef}
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        perspective: '100px',
        rotateX: businessCardX,
        rotateY: businessCardY
      }}
      w={{ base: '95%', md: '50%' }}
      whileTap={{ scale: 0.9 }}
    >
      {props.side === 'back' ? (
        <Popover placement="top">
          <PopoverTrigger>
            <Box>
              <BusinessCardImage />
            </Box>
          </PopoverTrigger>

          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverHeader>{popoverHeaderText}</PopoverHeader>

              <PopoverBody>
                <HStack>
                  <IconButton
                    aria-label={CaishCloudDetails.Website}
                    flexGrow={1}
                    icon={<Icon as={FaLink} boxSize={6} />}
                    onClick={() => openUrlInNewTab(CaishCloudDetails.Website)}
                  />

                  <IconButton
                    aria-label={CaishCloudDetails.Email}
                    flexGrow={1}
                    icon={<Icon as={BsEnvelopeFill} boxSize={6} />}
                    onClick={() =>
                      openUrlInNewTab(`mailto:${CaishCloudDetails.Email}`)
                    }
                  />

                  <IconButton
                    aria-label={CaishCloudDetails.Address}
                    flexGrow={1}
                    icon={<Icon as={PiBuildingsFill} boxSize={6} />}
                    onClick={() =>
                      openUrlInNewTab(
                        `https://maps.google.com?q=${CaishCloudDetails.Address}`
                      )
                    }
                  />
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <BusinessCardImage />
      )}
    </MotionBox>
  );
}
