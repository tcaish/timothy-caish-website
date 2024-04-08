import { LocalStorage } from '@/services/local-storage';
import {
  getLanguageTextForLanguageCode,
  i18n,
  languageCodes
} from '@/services/localization';
import { useStore } from '@/zustand/store';
import { Avatar, Box, Tooltip, useColorMode } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.scss';

/**
 * Shows the chosen language, and when selected, it then shows a menu of all
 * the other languages available. Then you can click on one of the languages
 * to change the language of the website.
 */
export default function LanguagesMenu() {
  const { colorMode } = useColorMode();
  const store = useStore();

  const updatedLanguageCodes = Object.keys(languageCodes)
    .filter((languageCode) => !store.locale.includes(languageCode))
    .sort((a, b) =>
      getLanguageTextForLanguageCode(b).localeCompare(
        getLanguageTextForLanguageCode(a)
      )
    );

  // Handles what happens when a language is selected
  function handleLanguageSelected(languageCode: string) {
    // Update the language
    i18n.locale = languageCode;
    store.setLocale(languageCode);

    // Mark that a language was selected
    store.setLanguageWasSelected(true);

    // Store the language in local storage
    LocalStorage.set(LocalStorage.Keys.Language, languageCode);

    // Update the <html /> lang attribute
    document.getElementsByTagName('html')[0].lang = languageCode;
  }

  // Create an algorithm to calculate the position of the menu items where they
  // spread out like a fan given the index of the menu item.
  function calculateMenuItemPosition(index: number) {
    let angleDenominator = 5;
    let xOffset = 20;
    let yOffset = 35;

    if (store.windowWidth <= 1330) {
      xOffset += 10;
    }

    if (store.windowWidth <= 1290) {
      angleDenominator = 4.5;
      xOffset += 20;
      yOffset += 10;
    }

    const menuItemWidth = 96;
    const menuItemHeight = 96;

    const angle = (index * Math.PI) / angleDenominator;
    const x = Math.cos(angle) * menuItemWidth - xOffset;
    const y = Math.sin(angle) * menuItemHeight + yOffset;

    return { x, y };
  }

  return (
    <Box onClick={() => store.setShowLanguagesMenu(!store.showLanguagesMenu)}>
      {/* Selected language */}
      <motion.div
        style={{ position: 'relative', zIndex: 2 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        <Avatar
          className="raised"
          name={getLanguageTextForLanguageCode()}
          size="sm"
          src={`/assets/flags/${store.locale.split('-')[0]}.png`}
        />
      </motion.div>

      {/* Menu of other languages */}
      <AnimatePresence>
        {store.showLanguagesMenu &&
          updatedLanguageCodes.map((languageCode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.05 * index },
                ...calculateMenuItemPosition(index)
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.2
                },
                x: 0,
                y: 0
              }}
              transition={{
                damping: 20,
                stiffness: 300,
                type: 'spring'
              }}
              style={{ position: 'absolute', zIndex: 2 }}
              whileHover={{ scale: 1.2, transition: { delay: 0 } }}
              whileTap={{ scale: 0.8 }}
            >
              <Box mt={3} onClick={() => handleLanguageSelected(languageCode)}>
                <Tooltip
                  bg={colorMode === 'light' ? 'gray.200' : 'gray.600'} // Using colorMode here because we will get React hooks error if we use useColorModeValue
                  color={colorMode === 'light' ? 'gray.700' : 'white'} // Using colorMode here because we will get React hooks error if we use useColorModeValue
                  hasArrow={true}
                  label={getLanguageTextForLanguageCode(languageCode)}
                  placement="left"
                >
                  <Avatar
                    className="raised"
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
