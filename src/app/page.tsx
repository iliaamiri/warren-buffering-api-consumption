import Link from 'next/link';
import Image from 'next/image';
import DrewPfp from '../../public/drew-pfp.jpg';

export default async function Page({ searchParams }: { searchParams: Record<string, string|string[]|undefined> }) {
	const secret = "HEISPROBABLYCANADIAN";
	const name = searchParams.name?.toString() ?? "warren";
	const response = await fetch(`https://api.warren.buffering.ca/check?secret_key=${secret}&name=${name}`);

	const result = await response.json();

	console.log(result);

	if (result.error && result.error.errorCode === 'X000') {
		return "Make sure to pass `name` query string with a non-empty string";
	}
	if (result.error && result.error.errorCode === 'X001') {
		return "API key is expired. Complain to Drew on X.";
	}
	if (result.error && result.error.errorCode === 'X002') {
		return "Looks like Drew decided to close the shop. You will never know who is Canadian or who is not Canadian. We are sorry for you.";
	}

	return (
		<div className='h-screen w-full flex flex-col py-10 px-5 md:pl-20 text-lg justify-between'>
			<div>
				<p>Is {capitalize(result.name)} Canadian? 🍁</p>	

				<p>{result.isCanadian} canadian.</p>
			</div>

			<Image alt='Warren in the buffer' priority={true} src="https://pbs.twimg.com/media/GEEUgAMbYAEpbxh?format=jpg" width={500} height={500} />

			<footer className='flex flex-col gap-1'>
				<Link href="https://buffering.ca/" className='text-blue-400 underline' target='_blank'>Docs.</Link>
				<div className='flex flex-wrap gap-1'>
					Shoutout to <Link href="https://twitter.com/drewskadoosh" className='underline transition-all hover:text-yellow-200'>drewskadoosh</Link> aka. <span className='text-yellow-200'>Drew</span>
					<Image alt='Twitter profile picture of drewskadoosh' src={DrewPfp} className='rounded-full' width={30} height={30} />
				</div>
			</footer>
		</div>
	);
}

function capitalize(str: string): string {
	return !str.length ? '' : str[0].toUpperCase() + str.slice(1);
}
