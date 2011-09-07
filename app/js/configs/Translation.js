/**
 * Translation class
 * @since 02/09/2011
 * @author Yannick Galatol <yannick.galatol@hotmail.fr>
 * @module Yadobe
 **/
var Translation = {
    currentLanguage : LANGUAGECONST.FRENCH,
    getTranslation : function(translationKey) {
        if ( (TRANSLATIONCONST[Translation.currentLanguage]) && (TRANSLATIONCONST[Translation.currentLanguage][translationKey]) ) {
            return TRANSLATIONCONST[Translation.currentLanguage][translationKey];
        }
        else {
            return 'Unknown translation';
        }
    }
};
