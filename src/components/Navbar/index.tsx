import Timer from "../Timer";
import NotificationsModal from "../NotificationsModal";

export default function index() {
	return (
		<nav>
			<div className='flex justify-center w-screen content-center top-0 p-6 bg-neutral-400 items-center gap-4'>
				<a
					href='/'
					id='home-icon'
					className='opacity-75 hover:opacity-100 active:opacity-50 hover:scale-105 active:scale-110 cursor-pointer transition-all ease-out duration-300'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='4rem'
						height='4rem'
						viewBox='0 0 24 24'
						fill='none'>
						<path
							d='M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z'
							stroke='#000000'
							strokeWidth='2'
						/>
						<path
							d='M15 18H9'
							stroke='#000000'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</a>
				<NotificationsModal />
				<Timer />
			</div>
		</nav>
	);
}




