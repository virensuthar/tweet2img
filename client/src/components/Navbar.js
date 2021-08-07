import logo from '../assets/logo.svg';

const Navbar = () => {
	return (
		<nav className='navbar navbar-light bg-dark shadow'>
			<div className='container-fluid'>
				<img className='navbar-brand' src={logo} alt='Tweet2Img' />
				<div className='d-flex'>
					<a
						className='text-white'
						target='_blank'
						rel='noreferrer'
						href='https://github.com/virensuthar/tweet2img'
					>
						Github
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
