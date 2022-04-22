import { ResponsiveLine } from '@nivo/line'

const data = [
  {
    id: 'japan',
    color: 'hsl(261, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 275,
      },
      {
        x: 'helicopter',
        y: 69,
      },
      {
        x: 'boat',
        y: 47,
      },
      {
        x: 'train',
        y: 110,
      },
      {
        x: 'subway',
        y: 110,
      },
      {
        x: 'bus',
        y: 12,
      },
      {
        x: 'car',
        y: 9,
      },
      {
        x: 'moto',
        y: 201,
      },
      {
        x: 'bicycle',
        y: 193,
      },
      {
        x: 'horse',
        y: 295,
      },
      {
        x: 'skateboard',
        y: 203,
      },
      {
        x: 'others',
        y: 87,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(312, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 255,
      },
      {
        x: 'helicopter',
        y: 15,
      },
      {
        x: 'boat',
        y: 260,
      },
      {
        x: 'train',
        y: 39,
      },
      {
        x: 'subway',
        y: 248,
      },
      {
        x: 'bus',
        y: 97,
      },
      {
        x: 'car',
        y: 155,
      },
      {
        x: 'moto',
        y: 291,
      },
      {
        x: 'bicycle',
        y: 86,
      },
      {
        x: 'horse',
        y: 230,
      },
      {
        x: 'skateboard',
        y: 12,
      },
      {
        x: 'others',
        y: 158,
      },
    ],
  },
]

const NivoVisualization = ({ data }) => {
  console.log(data)
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default NivoVisualization
