import {
  getLanguageTextForLanguageCode,
  i18n,
  languageCodes
} from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Avatar, Box, Tooltip, useColorMode } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import './index.scss';

export default function LanguagesMenu() {
  const { colorMode } = useColorMode();
  const store = useStore();

  const [showMenu, setShowMenu] = React.useState(false);

  const currentLanguageText = getLanguageTextForLanguageCode();
  const currentLocale = i18n.locale;
  const updatedLanguageCodes = Object.keys(languageCodes).filter(
    (languageCode) => !currentLocale.includes(languageCode)
  );

  // Handles what happens when the user clicks on the language menu
  function handleOnClick() {
    setShowMenu(!showMenu);
    store.setFullPageBlurEnabled(!store.isFullPageBlurEnabled);
  }

  return (
    <Box onClick={handleOnClick}>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        <Avatar
          name={currentLanguageText}
          size="xs"
          src={`/assets/flags/${currentLocale.split('-')[0]}.png`}
        />
      </motion.div>

      <AnimatePresence>
        {showMenu &&
          updatedLanguageCodes.map((languageCode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -3.5 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.05 * index },
                y: 45 * index
              }}
              exit={{ opacity: 0, y: -5, transition: { duration: 0.35 } }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              style={{ position: 'absolute', zIndex: 2 }}
              whileHover={{ scale: 1.2, transition: { delay: 0 } }}
              whileTap={{ scale: 0.8 }}
            >
              <Box mt={3}>
                <Tooltip
                  bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                  color={colorMode === 'dark' ? 'white' : 'gray.700'}
                  hasArrow={true}
                  label={getLanguageTextForLanguageCode(languageCode)}
                  placement="left"
                >
                  <Avatar
                    name={getLanguageTextForLanguageCode(languageCode)}
                    size="sm"
                    src={`/assets/flags/${languageCode}.png`}
                  />
                </Tooltip>
              </Box>
            </motion.div>
          ))}
      </AnimatePresence>
    </Box>
  );
}
