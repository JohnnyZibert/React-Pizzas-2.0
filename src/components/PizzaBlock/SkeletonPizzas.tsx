import ContentLoader from "react-content-loader"
import * as React from "react";

const SkeletonPizzas:React.FC = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="114" r="113" />
        <rect x="0" y="290" rx="10" ry="10" width="280" height="84" />
        <rect x="0" y="401" rx="3" ry="3" width="90" height="27" />
        <rect x="128" y="392" rx="21" ry="21" width="153" height="45" />
        <rect x="0" y="243" rx="11" ry="11" width="280" height="28" />
    </ContentLoader>
)

export default SkeletonPizzas