import { Part } from '../Part'

export const Content = ({ partList = [], exerciseList= [] }) => {
	return (
	<div>
	{
		partList.map((item, i) => (
			<Part key={`content-part-${i}`} part={item} exercise={exerciseList[i]}/>	
		))
	}
</div>
	)
}