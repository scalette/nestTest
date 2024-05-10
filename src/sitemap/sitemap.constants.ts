import { TopLevelCategory } from "src/top-page/top-page.model"

type routMapType = Record<TopLevelCategory, string>
export const CATEGORY_URL: routMapType = {
    0: '/courses',
    1: '/services',
    2: '/books',
    3: '/products',
}