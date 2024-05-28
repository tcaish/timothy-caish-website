import { opaqueDarkBgColor, opaqueLightBgColor } from '@/constants/colors';
import { BORDER_RADIUS_DEFAULT } from '@/constants/settings';
import { Skill } from '@/constants/types';
import { useStore } from '@/zustand/store';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Variants, motion } from 'framer-motion';
import React from 'react';

type SkillCardProps = {
  index: number;
  skill: Skill;
};

export default function SkillCard(props: SkillCardProps) {
  const store = useStore();

  const [isOtherCardHovered, setIsOtherCardHovered] = React.useState(false);
  const [isTapped, setIsTapped] = React.useState(false);
  const [isThisCardHovered, setIsThisCardHovered] = React.useState(false);

  // Animation variables
  const containerVariants: Variants = {
    base: {
      background: [
        `linear-gradient(-45deg, ${props.skill.color} 0%, ${useColorModeValue(
          opaqueLightBgColor,
          opaqueDarkBgColor
        )} 80%)`,
        `linear-gradient(135deg, ${props.skill.color} 0%, ${useColorModeValue(
          opaqueLightBgColor,
          opaqueDarkBgColor
        )} 80%)`
      ],
      opacity: 1,
      transition: {
        duration: 7,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',

        opacity: { duration: 0.5 }
      }
    },
    opaque: {
      opacity: 0.2
    }
  };

  // Update the card's hover state when global states change
  React.useEffect(() => {
    const isThisCardHoveredTemp = store.skillCardIndexHovered === props.index;
    setIsThisCardHovered(isThisCardHoveredTemp);
    setIsOtherCardHovered(
      store.skillCardIndexHovered != null && !isThisCardHoveredTemp
    );
  }, [store.skillCardIndexHovered]);

  // Handle what happens when the user stops hovering over the card
  function handleOnHoverEnd() {
    store.setSkillCardIndexHovered(null);
  }

  // Handle what happens when the user starts hovering over the card
  function handleOnHoverStart() {
    store.setSkillCardIndexHovered(props.index);
  }

  function handleOnTap() {
    setIsTapped(false);
    store.setSkillCardIndexSelected(props.index);
  }

  return (
    <motion.div
      animate={isOtherCardHovered ? 'opaque' : 'base'}
      onHoverEnd={handleOnHoverEnd}
      onHoverStart={handleOnHoverStart}
      onTap={handleOnTap}
      onTapStart={() => setIsTapped(true)}
      style={{
        borderRadius: BORDER_RADIUS_DEFAULT,
        width: '100%',
        zIndex: isThisCardHovered ? 1 : 0
      }}
      variants={containerVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        background: `radial-gradient(circle, ${
          props.skill.color
        } 0%, ${useColorModeValue(opaqueLightBgColor, opaqueDarkBgColor)} 80%)`,
        scale: 0.95
      }}
    >
      <Flex h="100%" position="relative" w="100%">
        <Heading
          alignContent="end"
          color={useColorModeValue('gray.600', 'gray.200')}
          lineHeight="normal"
          mb={1}
          ms={2}
          size="lg"
          w="75%"
        >
          {props.skill.title}
        </Heading>

        <motion.img
          animate={{
            scale: isTapped ? 0.95 : isThisCardHovered ? 1.5 : 1
          }}
          alt={props.skill.alt}
          src={props.skill.source}
          style={{
            bottom: '10px',
            height: '30%',
            position: 'absolute',
            right: '10px'
          }}
        />
      </Flex>
    </motion.div>
  );
}
