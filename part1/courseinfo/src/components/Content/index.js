import { Part } from '../Part'

export const Content = ({ partList = [] }) => {
	return (
	<div>
	{
		partList.map((item, i) => (
			<Part key={`content-part-${i}`} partName={item.name} exercise={item.exercises}/>	
		))
	}
</div>
	)
}