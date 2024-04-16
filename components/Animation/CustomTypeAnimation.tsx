import { i18n } from '@/services/localization';
import { useStore } from '@/zustand/store';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function CustomTypeAnimation() {
  const store = useStore();

  const defaultWaitInterval = 3000;

  // This needs to be memoized so that it rerenders when the language changes
  const CustomTypeAnimationMemoized = React.useCallback(
    () => (
      <TypeAnimation
        deletionSpeed={80}
        preRenderFirstString={true}
        sequence={[
          i18n.t('create_websites'),
          2000,
          i18n.t('create_websites_with_react'),
          defaultWaitInterval,
          i18n.t('create_websites_with_nextjs'),
          defaultWaitInterval,
          i18n.t('create_websites_with_chakra'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps_with_react_native'),
          defaultWaitInterval,
          i18n.t('create_mobile_apps_with_expo'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_supabase'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_firebase'),
          defaultWaitInterval,
          i18n.t('can_integrate_with_aws'),
          defaultWaitInterval,
          `${i18n.t('love_what_i_do')} 🚀🌈`
        ]}
        speed={60}
      />
    ),
    [store.locale]
  );

  return <CustomTypeAnimationMemoized />;
}
