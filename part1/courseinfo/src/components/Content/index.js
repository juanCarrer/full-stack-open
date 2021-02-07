import { Part } from '../Part'

export const Content = ({ partsList = [] }) => {
	return (
	<div>
	{
		partsList.map((item, i) => (
			<Part key={`content-part-${i}`} partName={item.name} exercise={item.exercises}/>	
		))
	}
</div>
	)
}