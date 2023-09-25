import Header from '../components/Header'

function HeaderOnlyLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='Container'>
                {children}
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;