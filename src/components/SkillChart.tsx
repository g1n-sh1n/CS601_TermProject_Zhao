import { useEffect, useRef } from "react";
import type { Skill } from "../types.ts";

interface SkillChartProps {
  skills: Skill[];
}

// Extra credit (HTML5 Canvas API): horizontal bar chart of skill levels.
// The same data is also shown as a list on the page, so the chart is
// marked as an image with a text summary for screen readers.
function SkillChart({ skills }: SkillChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Size the canvas to its CSS width, sharp on retina screens
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const rowHeight = 28;
      const height = skills.length * rowHeight + 10;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.height = `${height}px`;
      ctx.scale(ratio, ratio);

      const labelWidth = Math.min(160, width * 0.4);
      const barMax = width - labelWidth - 20;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "13px Helvetica, Arial, sans-serif";
      ctx.textBaseline = "middle";

      skills.forEach((skill, i) => {
        const y = i * rowHeight + 5;
        ctx.fillStyle = "#666666";
        ctx.fillText(skill.name, 0, y + rowHeight / 2 - 2);

        // background track
        ctx.fillStyle = "#f4f4ec";
        ctx.fillRect(labelWidth, y + 4, barMax, rowHeight - 14);

        // level bar
        ctx.fillStyle = "#2e963d";
        ctx.fillRect(labelWidth, y + 4, (barMax * skill.level) / 5, rowHeight - 14);
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [skills]);

  const summary = skills.map((s) => `${s.name} ${s.level} of 5`).join(", ");

  return <canvas ref={canvasRef} className="skill-chart" role="img" aria-label={`Skill levels: ${summary}`} />;
}

export default SkillChart;
