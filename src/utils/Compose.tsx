type Children = React.ReactElement | React.ReactElement[];
type Provider = ({ children }: { children: Children }) => React.ReactElement;

interface Props {
	components: Provider[];
	children: React.ReactElement;
}

export default function Compose({ components = [], children }: Props) {
	return (
		<>
			{components.reduceRight((acc, Component) => {
				return <Component>{acc}</Component>;
			}, children)}
		</>
	);
}
