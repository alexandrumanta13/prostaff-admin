import { NgModule } from '@angular/core';

import { UICardsModule } from 'app/main/ui/cards/cards.module';
import { UIFormsModule } from 'app/main/ui/forms/forms.module';
import { UIIconsModule } from 'app/main/ui/icons/icons.module';
import { UITypographyModule } from 'app/main/ui/typography/typography.module';
import { UIHelperClassesModule } from 'app/main/ui/helper-classes/helper-classes.module';
import { UIPageLayoutsModule } from 'app/main/ui/page-layouts/page-layouts.module';
import { UIColorsModule } from 'app/main/ui/colors/colors.module';
import { UIColorModule } from './color/color.module';
import { UISlidersModule } from './sliders/sliders.module';
import { UICategoriesModule } from './categories/categories.module';

@NgModule({
    imports: [
        UICardsModule,
        UIFormsModule,
        UIIconsModule,
        UITypographyModule,
        UIHelperClassesModule,
        UIPageLayoutsModule,
        UIColorsModule,
        UIColorModule,
        UISlidersModule,
        UICategoriesModule,
        
    ]
})
export class UIModule
{
}
