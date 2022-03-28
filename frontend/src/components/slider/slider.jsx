import { Box, Slider } from "@mui/material"
import './slider.css'

const DepthSlider = ({ depth, setDepth }) => {

  return (
    <div className="slider">
      <Box sx={{ height: 700 }}>
        <Slider
          valueLabelDisplay="on" 
          value={depth}
          min={0}
          max={2000}
          sx={{
            color: 'red',
            '& input[type="range"]': {
              WebkitAppearance: 'slider-vertical',
            },
          }}
          orientation="vertical"
          onChange={e => setDepth(e.target.value)}
        />
      </Box>
    </div>
  )

}

export default DepthSlider