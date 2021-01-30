interface Props {
	name: string;
	info: string;
}

const InfoBlock = ({ name, info }: Props) => {
	return (
		<>
			<div
				className='w-100 border border-primary border-2 bg-infoblock p-3 m-auto mx-md-2 d-flex flex-column mt-lg-0 mt-3'
				style={{ borderRadius: 12, minHeight: 190 }}
			>
				<p className='mx-auto mt-3' style={{ fontSize: 18 }}>
					{name}
				</p>
				<p
					className='m-auto text-center'
					style={{ fontSize: 26, fontWeight: 500 }}
				>
					{info}
				</p>
			</div>
		</>
	);
};

export default InfoBlock;
