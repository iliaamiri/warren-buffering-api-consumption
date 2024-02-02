export default async function Page({ searchParams }: { searchParams: Record<string, string|string[]|undefined> }) {
	const secret = "HEISPROBABLYCANADIAN";
	const name = searchParams.name?.toString() ?? "warren";
	const response = await fetch(`https://api.warren.buffering.ca/check?secret_key=${secret}&name=${name}`);

	const result = await response.json();

	return (
		<div className='h-screen w-full flex flex-col pt-10 pl-20 text-lg'>
			<p>Is {capitalize(result.name)} Canadian?</p>	

			<p>{result.isCanadian} canadian.</p>
		</div>
	);
}

function capitalize(str: string): string {
	if (str.length < 1) return '';
	return str[0].toUpperCase() + str.slice(1);
}
