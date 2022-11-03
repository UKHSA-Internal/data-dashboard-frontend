import { PhaseBanner, TopNav } from 'govuk-react'

function Crown(prop) {
    return null;
}

const Header = () => {
    return (
        <header>
            <TopNav
                company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle
                    icon={<Crown height="32" width="36" />}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}
                serviceTitle={<TopNav.NavLink href="https://localhost:3000" target="new">White Label
                    Dashboard</TopNav.NavLink>} />
            <PhaseBanner level="beta">
                This part of GOV.UK is being rebuilt – Winter Pressures Dashboard under development{' '}
            </PhaseBanner>
        </header>
    );
};
export default Header;