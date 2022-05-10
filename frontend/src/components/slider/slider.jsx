import { Box, Slider } from "@mui/material"
import './slider.css'

const DepthSlider = ({ depth, setDepth }) => {

  return (
    <div className="slider">
      <Box sx={{ height: 700 }}>
        <Slider
          valueLabelDisplay="auto" 
          value={depth}
          min={-2000}
          max={0}
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