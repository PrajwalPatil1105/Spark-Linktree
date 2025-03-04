import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import styles from "../Styles/Analytics.module.css";
import { Calendar } from "lucide-react";

const generatePlatformColors = (platformNames) => {
  const baseColors = ["#48bb78", "#2e855a", "#1a472a", "#9ae6b4", "#38a169"];

  const platformColors = {};
  platformNames.forEach((platform, index) => {
    platformColors[platform] = baseColors[index % baseColors.length];
  });

  return platformColors;
};

const Analytics = ({ UserInfo, LinkInfo }) => {
  const [dateRange, setDateRange] = useState("Feb 8th to Feb 15th");

  const platformColors = useMemo(() => {
    const linkPlatforms = LinkInfo?.filter((link) => link.type === "link")
      .map((link) => link.platformName)
      .filter((v, i, a) => a.indexOf(v) === i);

    return generatePlatformColors(linkPlatforms);
  }, [LinkInfo]);

  const monthlyData = useMemo(() => {
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const monthMap = {};
    monthOrder.forEach((month) => {
      monthMap[month] = 0;
    });
    LinkInfo?.forEach((link) => {
      const month = new Date(link.createdAt).toLocaleString("default", {
        month: "short",
      });
      if (monthOrder.includes(month)) {
        monthMap[month] += link.totalClicks;
      }
    });
    return monthOrder.map((month) => ({
      name: month,
      value: monthMap[month],
    }));
  }, [LinkInfo]);

  const totalLinkClicks = useMemo(() => {
    return LinkInfo?.filter((link) => link.type === "link").reduce(
      (sum, link) => sum + link.totalClicks,
      0
    );
  }, [LinkInfo]);

  const totalShopClicks = useMemo(() => {
    return LinkInfo?.filter((link) => link.type === "shop").reduce(
      (sum, link) => sum + link.totalClicks,
      0
    );
  }, [LinkInfo]);

  const deviceData = useMemo(() => {
    const deviceClicks = {
      Linux: 0,
      Mac: 0,
      iOS: 0,
      Windows: 0,
      Android: 0,
      Other: 0,
    };

    LinkInfo.forEach((link) => {
      if (link.clickDetails && link.clickDetails.length > 0) {
        link.clickDetails.forEach((click) => {
          const os = click.os || "Unknown";
          let deviceCategory = "Other";
          if (os.toLowerCase().includes("windows")) deviceCategory = "Windows";
          else if (os.toLowerCase().includes("mac")) deviceCategory = "Mac";
          else if (os.toLowerCase().includes("linux")) deviceCategory = "Linux";
          else if (os.toLowerCase().includes("ios")) deviceCategory = "iOS";
          else if (os.toLowerCase().includes("android"))
            deviceCategory = "Android";
          deviceClicks[deviceCategory]++;
        });
      }
    });

    // Convert to array and ensure all categories are represented
    return Object.entries(deviceClicks)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [LinkInfo]);

  const maxDeviceClicks = useMemo(() => {
    return Math.max(...deviceData.map((item) => item.value), 10);
  }, [deviceData]);

  const sitesData = useMemo(() => {
    const linkPlatforms = LinkInfo?.filter((link) => link.type === "link")
      .slice(0, 3)
      .map((link) => ({
        name: link.platformName,
        value: link.totalClicks,
        color: platformColors[link.platformName] || "#9ae6b4",
      }));

    const otherClicks = LinkInfo?.filter((link) => link.type === "link")
      .slice(3)
      .reduce((sum, link) => sum + link.totalClicks, 0);

    if (otherClicks > 0) {
      linkPlatforms.push({
        name: "Others",
        value: otherClicks,
        color: "#9ae6b4",
      });
    }

    return linkPlatforms;
  }, [LinkInfo, platformColors]);

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.header}>
        <h2>Overview</h2>
        <div className={styles.datediv}>
          <Calendar size={20} />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={styles.dateSelect}
          >
            <option value="Feb 8th to Feb 15th">Feb 8th to Feb 15th</option>
          </select>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard1}>
          <h3>Clicks on Links</h3>
          <p className={styles.statNumber}>{totalLinkClicks}</p>
        </div>
        <div className={styles.statCard2}>
          <h3>Click on Shop</h3>
          <p className={styles.statNumber}>{totalShopClicks}</p>
        </div>
        <div className={styles.statCard3}>
          <h3>CTA</h3>
          <p className={styles.statNumber}>{maxDeviceClicks}</p>
        </div>
      </div>

      <div className={styles.chartSection}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#28A263"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.analyticsGrid}>
        <div className={styles.card}>
          <h3>Traffic by Device</h3>
          <div className={styles.chartContainer}>
            <div className={styles.yAxis}>
              <span>3K</span>
              <span>2K</span>
              <span>1K</span>
              <span>0</span>
            </div>
            <div className={styles.barChart}>
              {deviceData.map((item, index) => (
                <div key={index} className={styles.barGroup}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${(item.value / 100) * 100}px`, // Increased height
                      backgroundColor:
                        item.name === "Windows"
                          ? "#1a472a"
                          : item.name === "Android"
                          ? "#38a169"
                          : item.name === "iOS"
                          ? "#48bb78"
                          : item.name === "Mac"
                          ? "#2e855a"
                          : item.name === "Linux"
                          ? "#9ae6b4"
                          : "#a0aec0", // Other
                    }}
                  />
                  <span className={styles.barLabel}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Sites</h3>
          <div className={styles.pieChart}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sitesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sitesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.pieStats}>
              {sitesData.slice(0, 4).map((item, index) => (
                <div key={index} className={styles.pieStat}>
                  <span
                    className={styles.dotIndicator}
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Traffic by Links</h3>
        <div className={styles.chartContainer}>
          <div className={styles.yAxis}>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
          <div className={styles.barChart}>
            {sitesData.map((item, index) => {
              const totalValue = sitesData.reduce((sum, d) => sum + d.value, 0);
              const heightPercentage = (item.value / totalValue) * 100;
              return (
                <div key={index} className={styles.barGroup}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${heightPercentage}px`,
                      backgroundColor: item.color,
                    }}
                  />
                  <span className={styles.barLabel}>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
