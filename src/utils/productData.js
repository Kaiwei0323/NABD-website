// Product data - list of all products in public/product folder
// Each product folder contains: image/ and spec/ subfolders

export const products = [
  {
    id: '32e',
    name: '32E',
    imagePath: '/product/32e/image/32e.jpg',
    specPath: '/product/32e/spec/32e_spec.pdf',
    specInfo: {
      model: '32E',
      cpu: {
        processor: 'Qualcomm SDA660'
      },
      operating_system: {
        name: 'Android',
        version: '10.0'
      },
      memory_storage: {
        memory: '4GB',
        storage: '64GB'
      },
      wlan_bluetooth: {
        wifi: '802.11 a/b/g/n/ac mimox2',
        bluetooth: true
      },
      nfc: {
        frequency: '13.56 MHz'
      },
      lte: {
        slot: 'M.2'
      },
      gnss: {
        gps: true
      },
      display: {
        size: '8 inches',
        touch: 'P-CAP'
      },
      io: {
        internal_speaker: '1.5W',
        usb_type_c: {
          version: '3.1',
          features: ['DP Alt Mode', 'Data', 'Charging']
        },
        micro_sd_slot: 1,
        micro_sim_slot: 1,
        aim_dock_connector: {
          pins: 16,
          interface: 'USB2.0'
        },
        aim_extension_connector: {
          pins: 14,
          interface: '1 x 2-wire UART'
        }
      },
      input_voltage: {
        type_c: '9V/2A'
      },
      camera: {
        front: {
          resolution: '5MP',
          focus: 'Fixed Focus'
        },
        rear: {
          resolution: '8MP',
          focus: 'Auto Focus',
          led_flash: true
        }
      },
      battery: {
        swappable: true,
        configuration: '1S2P',
        led_indicator: 3
      },
      adapter: {
        type: 'USB Type C'
      },
      buttons_led: {
        buttons: ['Power Button', 'Volume +', 'Volume -', 'Programmable Key'],
        led_indicator: 'Power / battery status'
      },
      sensors: ['Ambient Light Sensor (ALS)', 'E-compass', 'G-sensor', 'Gyroscope'],
      physical: {
        dimensions_mm: '142 x 240 x 14.5',
        weight_g: 600
      },
      drop_test: '4ft / 120cm',
      ip_rating: 'IP65',
      temperature: {
        operation: '0 ~ 40 °C',
        storage: '-20 ~ 60 °C'
      },
      mp_date: 'Q2/2021'
    }
  },
  {
    id: '32p',
    name: '32P',
    imagePath: '/product/32p/image/32p.jpg',
    specPath: '/product/32p/spec/32p_spec.pdf',
    specInfo: {
      model: '32P',
      platform: {
        processor: 'Qualcomm Snapdragon 660',
        category: 'Mobile Platform'
      },
      operating_system: {
        name: 'Google Android',
        version: '9',
        type: 'Embedded'
      },
      display: {
        size: '8 inch',
        resolution: '1200x800',
        brightness: '800 nits',
        features: ['Sunlight readable']
      },
      camera: {
        rear: {
          resolution: '5MP',
          focus: 'Auto Focus'
        }
      },
      gps: {
        standalone: true,
        agps_supported: true
      },
      video_codec_support: ['MPEG-1', 'MPEG-2', 'MPEG-4', 'H.263', 'H.264', 'VP8', 'VP9'],
      hardware_design: {
        standard: 'ISO 16750 compliant'
      },
      system_integration: {
        proprietary_api_reserved: true
      },
      product_type: 'Industrial Mobile',
      platform_solution: ['AIM Android Solution Platform', 'AI / iVideo Solution Platform']
    }
  },
  {
    id: '53r',
    name: '53R',
    imagePath: '/product/53r/image/ATC-53R_600X600.png',
    specPath: '/product/53r/spec/53r_spec.pdf',
    specInfo: {
      model: '53R',
      processor: {
        name: 'Intel Elkhart Lake Celeron N6210',
        tdp: '6.5W'
      },
      operating_system: {
        name: 'Windows 10 IoT Enterprise LTSC',
        security: 'TPM 2.0'
      },
      memory: {
        type: 'LPDDR4x',
        default: '4GB',
        max: '8GB'
      },
      storage: {
        type: 'eMMC',
        default: '64GB',
        max: '128GB'
      },
      pen: {
        optional: true,
        type: 'Passive pen'
      },
      display: {
        size: '10.1 inch',
        resolution: '800x1280',
        panel: 'HD LCD',
        cover_glass: 'Gorilla Glass 3',
        protection: 'IK06',
        options: ['AG', 'AR', 'PF']
      },
      touch: {
        type: 'P-CAP',
        multi_touch: 10,
        bonding: 'Direct bonding with LCD panel'
      },
      sensors: ['G-sensor', 'Ambient light sensor'],
      buttons: ['Power button', 'Volume +', 'Volume -', 'Barcode / Programmable key'],
      led: {
        type: 'Tri-color',
        function: ['Power', 'Battery indicator']
      },
      io: {
        audio: 'Mic-in / Line-out combo jack',
        speaker: '1 x 2W speaker',
        usb_type_c: {
          version: 'USB 3.1 Type-C',
          features: ['DP Alt Mode', 'Data', 'Charging'],
          input: '20V',
          output: '5V/2A'
        },
        usb_type_a: {
          version: 'USB 3.0',
          output: '5V/0.9A'
        },
        dock: {
          type: 'AIM pogo connector',
          interface: 'USB 3.0'
        }
      },
      barcode: {
        optional: true,
        type: '1D/2D Barcode Imager'
      },
      camera: {
        front: {
          resolution: '2MP',
          focus: 'Fixed Focus'
        },
        rear: {
          resolution: '5MP',
          focus: 'Auto Focus',
          flash: true
        }
      },
      wireless: {
        wifi: '802.11a/b/g/n/ac/ax',
        bluetooth: 'BT 5.3'
      },
      battery: {
        voltage: '10.8V',
        capacity: '4550mAh',
        energy: '50.32Wh'
      },
      nfc: {
        optional: true,
        frequency: '13.56MHz',
        standards: ['ISO/IEC 14443A', 'ISO/IEC 14443B', 'FeliCa PCD mode']
      },
      environment: {
        protection: 'IP65',
        features: ['Corner bumper protection', 'Hand strap support', 'Shoulder strap support'],
        operating_temperature: {
          non_charging: '0°C ~ 40°C',
          charging: '0°C ~ 35°C'
        },
        storage_temperature: '-20°C ~ 60°C',
        drop: '1.2m',
        shock: 'IEC60068-2-27',
        vibration: 'IEC60068-2-64'
      },
      certification: ['CE', 'FCC'],
      power_adapter: {
        optional: true,
        rating: '65W',
        voltage: '20V',
        current: '2.25A'
      },
      physical: {
        dimensions_mm: '281 x 184 x 18.5',
        weight: '990g (typical)'
      }
    }
  },
  {
    id: '63e',
    name: '63E',
    imagePath: '/product/63e/image/ATC-63E_600X600.png',
    specPath: '/product/63e/spec/63e_spec.pdf',
    specInfo: {
      model: '63E',
      processor: {
        type: 'Intel Tiger Lake UP3'
      },
      supported_os: {
        name: 'Windows IoT Enterprise'
      },
      memory: {
        default: '4GB DDR4',
        max: '16GB',
        optional: true
      },
      storage: {
        default: '128GB SSD',
        max: '1TB',
        optional: true
      },
      display: {
        size: '13.3 inch',
        type: 'IPS LCD',
        resolution: '1920x1080 Full HD',
        touch: {
          type: 'CAP 10-point Multi-touch',
          features: ['Glove mode', 'Touch in water puddle'],
          cover_glass: 'Gorilla Glass 3',
          anti_fingerprint: true
        }
      },
      wireless: {
        wifi: 'Intel AC9260',
        bluetooth: 'BT 5.0'
      },
      camera: {
        front: {
          resolution: '5MP',
          focus: 'Fixed Focus'
        },
        rear: {
          resolution: '8MP',
          focus: 'Auto Focus',
          flash: true
        }
      },
      speaker: {
        configuration: '2 x 2W',
        type: 'With Chamber'
      },
      io: {
        hdmi: 1,
        usb_3_0_type_a: 2,
        usb_3_1_type_c: 1,
        usb_3_0_dc_charging: 1,
        ethernet: 'RJ45 10/100/1000 Mbps',
        audio_jack: '3.5mm combo'
      },
      battery: {
        voltage: '10.8V',
        capacity_mAh: 4660,
        energy_Wh: 50.32
      },
      adapter: {
        power: '90W'
      },
      physical: {
        dimensions_mm: '330 x 240 x 20.8',
        weight_kg: 1.8
      },
      durability: {
        mil_std: 'MIL-STD-810G',
        medical: ['IEC 60601-1', 'EN 60601-1'],
        water_resistance: 'IP65'
      },
      certifications: ['CB', 'CE', 'FCC', 'BSMI', 'NCC', 'IEC 60601', 'UL 62368', 'RoHS'],
      temperature: {
        charging: '0 ~ 40 °C',
        discharging: '-10 ~ 55 °C',
        storage: '-20 ~ 60 °C'
      },
      led_indicator: {
        count: 3,
        functions: ['Charging']
      },
      buttons_keys: {
        power: 1,
        programmable: 3,
        optional: true
      },
      sensors: ['G-sensor', 'E-compass']
    }
  },
  {
    id: 'agx-orin',
    name: 'AGX-ORIN',
    imagePath: '/product/agx-orin/image/AGX-Orin-series_600x600.png',
    specPath: '/product/agx-orin/spec/AIM-Edge heoa V25V01.pdf',
    specInfo: {
      model: 'AGX Orin',
      processor: {
        type: 'NVIDIA Jetson AGX Orin'
      },
      memory: {
        size: '64GB / 32GB',
        type: 'LPDDR5'
      },
      storage: {
        type: 'eMMC 5.1',
        capacity: '64GB'
      },
      operating_system: {
        name: 'Linux',
        versions: ['Linux 5.10', 'Ubuntu 20.04']
      },
      ethernet: {
        ports: [
          { type: 'GbE LAN', poe: false, count: 1 },
          { type: 'GbE LAN', poe: 'POE+', count: 4, interface: 'M12' }
        ]
      },
      io: {
        usb: [
          { type: 'USB 3.2 Type-C', features: ['DP'] },
          { type: 'USB 2.0', count: 2 }
        ],
        serial_ports: [
          { type: 'Isolated RS-485', count: 1 },
          { type: 'RS-232', count: 1 }
        ],
        can_ports: [{ type: 'Isolated CAN 2.0', count: 2 }],
        digital_input: [{ type: 'Isolated DI' }],
        expansion_slots: [
          { type: 'M.2 PCIe Slot B-key', purpose: 'LTE/5G' },
          { type: 'M.2 PCIe Slot M-Key', purpose: 'NVMe SSD' },
          { type: 'Mini PCIe Slot', features: ['USB 2.0', 'PCIe x1'] },
          { type: 'Mini PCIe Slot', features: ['USB 2.0'] }
        ]
      },
      camera: 'Not specified',
      indicator: {
        led: true
      },
      environment: {
        operating_temperature: '-25 ~ 60 °C'
      },
      mechanical: {
        dimensions_mm: '225 x 195 x 89',
        weight: 'TBD'
      },
      power: {
        input_voltage: '18V to 36V DC with Ignition Control',
        power_led: true
      }
    }
  },
  {
    id: 'aioox',
    name: 'AIOOX',
    imagePath: '/product/aioox/image/Edge-aioox_600x600.png',
    specPath: '/product/aioox/spec/AIM Edge aioox.pdf',
    specInfo: {
      product_family: 'AIM-Edge',
      models: [
        {
          model: 'aioh3',
          processor: 'NVIDIA Jetson Tegra X2',
          memory: '8GB LPDDR4',
          storage: {
            type: 'eMMC',
            capacity: '32GB'
          },
          wireless: 'Yes, via Router',
          ethernet: [
            { port_type: 'GigaBit Ethernet', count: 1 },
            { port_type: '802.3af POE', count: 2, pse_max_w: 15.4 }
          ],
          io: [
            { type: 'USB 2.0 OTG Micro-AB', count: 1 },
            { type: 'USB 3.0 Type-A', count: 4 },
            { type: 'HDMI', count: 1 },
            { type: 'RS232 pin header', count: 1 },
            { type: 'GPIO', DI: 6, DO: 6 }
          ],
          expansion_storage: 'mSATA Slot (2.5" SSD 1TB)',
          buttons: ['Reset', 'Recovery', 'Power'],
          environment: {
            operation_temperature: '-20 ~ 60°C'
          },
          mechanical: {
            dimensions_mm: '600 x 478 x 188',
            weight_kg: 19.5
          },
          os: ['Linux 4.9', 'Ubuntu 18.04'],
          power: {
            input_voltage: '110~220V AC',
            protection: ['Molded Case Circuit Breaker', 'Earth Leakage Circuit Breaker']
          }
        },
        {
          model: 'aiox1',
          processor: 'NVIDIA Jetson Xavier NX',
          memory: '8GB LPDDR4',
          storage: {
            type: 'PCIE M.2 SSD',
            capacity: '256GB'
          },
          ethernet: [
            { port_type: 'GigaBit Ethernet', count: 1 },
            { port_type: 'GigaBit Ethernet 802.3at', count: 3 }
          ],
          io: [
            { type: 'USB 2.0 Micro-B', count: 1 },
            { type: 'USB 3.0 Type-A', count: 1 },
            { type: 'Micro HDMI', count: 1 },
            { type: 'PWM (0-10V)', count: 1 },
            { type: 'GPIO', DO: 2 }
          ],
          poe_switch: {
            ports: 8,
            power_rating: ['120W 12V', '120W 48V']
          },
          buttons: ['Reset', 'Recovery', 'Power']
        },
        {
          model: 'aioox',
          processor: 'NVIDIA Jetson Orin NX',
          memory: '16GB / 8GB LPDDR5',
          storage: {
            type: 'External NVMe via x4 PCIe / PCIE M.2 SSD',
            capacity: '256GB'
          },
          ethernet: [
            { port_type: 'GigaBit Ethernet', count: 1 },
            { port_type: 'GigaBit Ethernet 802.3at', count: 6 }
          ],
          io: [
            { type: 'USB 2.0 Micro-B', count: 1 },
            { type: 'USB 3.0 Type-A', count: 1 },
            { type: 'Micro HDMI', count: 1 },
            { type: 'PWM (0-10V)', count: 1 },
            { type: 'GPIO', DO: 2 }
          ],
          poe_switch: {
            ports: 8,
            power_rating: ['120W 12V', '240W 48V']
          },
          buttons: ['Reset', 'Recovery', 'Power']
        }
      ]
    }
  },
  {
    id: 'edge-pro-1u',
    name: 'EDGE-PRO-1U',
    imagePath: '/product/edge-pro-1u/image/server-1U_1000X1000.png',
    specPath: '/product/edge-pro-1u/spec/edge_pro_1u_spec.pdf',
    specInfo: {
      model: 'Edge-Pro 1U',
      form_factor: {
        type: '1U1N1P',
        dimensions_mm: '435 x 42.88 x 430',
        dimensions_inch: '17.13 x 1.69 x 16.93'
      },
      processor: {
        socket: 'Single Socket-E2 (LGA4710)',
        supported: [
          'Intel Xeon 6500/6700-series P-cores',
          'Intel Xeon 6700-series E-cores'
        ]
      },
      memory: {
        slots: 8,
        type: 'DDR5',
        speed: 'up to 6400MT/s',
        '1DPC': true
      },
      storage: {
        nvme_m2: 'Support up to 2x NVMe Gen 5 M.2 SSDs (2280)',
        nvme_e1s: 'Support up to 6x NVMe Gen 5 E1.S SSDs',
        vroc_raid: 'Intel VROC SW RAID capable'
      },
      network: {
        embedded: 'Intel i210 1Gb 4 ports',
        optional: 'OCP NIC 3.0 SFF'
      },
      management: {
        dc_scm_module: {
          ports: ['2x USB3.0', '1x Mini Display Port', '1x RJ45 management port']
        }
      },
      io_expansion: {
        ocp_slot: '1x OCP 3.0 Slot (x16 PCIe 5.0)'
      },
      power: {
        input: 'DC-IN 54V',
        optional_adapter: '1600W AC to DC'
      },
      fan: {
        count: 7,
        type: 'Dual Rotor',
        redundancy: 'N+1',
        feature: 'Optimal Fan Speed Control'
      },
      performance: {
        pq_performance: 'High',
        power_consumption: 'Low'
      }
    }
  },
  {
    id: 'edge-pro-2u',
    name: 'EDGE-PRO-2U',
    imagePath: '/product/edge-pro-2u/image/server-2U_1000X1000.png',
    specPath: '/product/edge-pro-2u/spec/edge_pro_2u_spec.pdf',
    specInfo: {
      model: 'Edge-Pro 2U',
      form_factor: {
        type: '2U1N1P',
        dimensions_mm: '435 x 87.6 x 430',
        dimensions_inch: '17.13 x 3.45 x 16.93'
      },
      processor: {
        socket: 'Single Socket-E2 (LGA4710)',
        supported: [
          'Intel Xeon 6500/6700-series P-cores',
          'Intel Xeon 6700-series E-cores'
        ]
      },
      memory: {
        slots: 8,
        type: 'DDR5',
        speed: 'up to 6400MT/s',
        '1DPC': true
      },
      storage: {
        nvme_m2: 'Support up to 2 NVMe Gen 5 M.2 SSDs (2280)',
        nvme_e1s: 'Support up to 4 NVMe Gen 5 E1.S SSDs',
        vroc_raid: 'Intel VROC SW RAID capable'
      },
      network: {
        embedded: 'Intel i210 1Gb 4 ports',
        optional: 'OCP NIC 3.0 SFF'
      },
      management: {
        dc_scm_module: {
          ports: [
            '2x USB3.0',
            '1x Mini Display Port',
            '1x RJ45 management port',
            '1x OCP 3.0 Slot (x16 PCIe 5.0)'
          ]
        }
      },
      io_expansion: {
        riser_slots: [
          {
            type: 'DS FHFL PCIe card slot',
            count: 1,
            interface: 'x16 PCIe 5.0',
            tdp_w: 350
          },
          {
            type: 'SS FHFL PCIe card slot',
            count: 2,
            interface: 'x8 PCIe 5.0',
            tdp_w: 75
          }
        ]
      },
      power: {
        input: 'DC-IN 54V',
        optional_adapter: '1600W AC to DC'
      },
      fan: {
        count: 6,
        type: 'Dual Rotor',
        redundancy: 'N+1',
        feature: 'Optimal fan speed control'
      },
      performance: {
        pq_performance: 'High',
        power_consumption: 'Low'
      }
    }
  },
  {
    id: 'igx-orin',
    name: 'IGX-ORIN',
    imagePath: '/product/igx-orin/image/IGX-Orin-series_600X600.png',
    specPath: '/product/igx-orin/spec/Inventec Orin IGX 2U.pdf',
    userGuidePath: '/product/igx-orin/userGuide/Inventec-IGX-Orin_Software_Installation-20250812.pdf',
    specInfo: {
      model: 'IGX Orin series',
      form_factor: '2U AI Edge',
      cpu: {
        type: '12-core Arm Cortex-A78AE v8.2 64-bit',
        cache: {
          L2: '3MB',
          L3: '6MB'
        }
      },
      gpu: {
        integrated: {
          architecture: 'NVIDIA Ampere',
          cuda_cores: 2048,
          tensor_cores: 64
        },
        optional: {
          model: 'NVIDIA RTX6000 Ada',
          architecture: 'NVIDIA Ampere',
          memory: '48GB GDDR6',
          cuda_cores: 10752,
          tensor_cores: 336
        }
      },
      ai_performance: '700 TOPS',
      ram: '64GB LPDDR6',
      storage: '1TB SSD',
      ethernet: [
        { type: '100GbE QSFP28', count: 2 },
        { type: '1GbE RJ45', count: 2 }
      ],
      i_o: {
        usb: [
          { type: 'USB3.2 Type-A', count: 4 },
          { type: 'USB3.2 Type-C', count: 1 }
        ],
        hdmi: [{ input: 1, note: 'No display output from HDMI port' }],
        displayport: [{ output: 1 }, { optional_rtx6000_ada_dp: 4 }],
        audio: [
          { type: 'Line-out', count: 1 },
          { type: 'MIC', count: 1 }
        ],
        pcie: [
          { slot_type: 'Gen5 single width', x: 8 },
          { slot_type: 'Gen5 double width', x: 16 }
        ]
      },
      expansion_slots: 'PCIe slots as listed above',
      display_interface: ['Yuan SC400 N2-L HDMI (included)', 'Optional RTX6000 Ada DP'],
      power_supply: '860W ATX',
      features: [
        'High-performance AI computing with NVIDIA Orin SoC',
        'Industrial-grade reliability and long-term support',
        'Scalable and secure for enterprise protection and industrial automation',
        'Optimized for healthcare, robotics, and industrial edge AI applications',
        'Seamless integration with NVIDIA AI Enterprise and JetPack SDKs'
      ]
    }
  },
  {
    id: 'm185',
    name: 'M185',
    imagePath: '/product/m185/image/M185_600X600.png',
    specPath: '/product/m185/spec/M185.pdf',
    specInfo: {
      model: 'M185',
      cpu: {
        type: 'Intel Elkhart Lake Celeron J6412',
        vpro: true
      },
      graphics: {
        type: 'Integrated Intel Graphics'
      },
      memory: {
        size: '8GB DDR'
      },
      storage: {
        type: 'NVMe SSD',
        capacity: '128GB'
      },
      os: {
        default: 'Windows 10 IoT LTSC',
        optional: true
      },
      display: {
        size: '18.5 inches',
        resolution: '1366 x 768 FHD',
        touch: {
          type: 'PCAP 10-point',
          features: ['Gloves Friendly']
        },
        luminance_nits: 380,
        contrast_ratio: 1000
      },
      io: {
        usb_3_0: 5,
        usb_2_0: 1,
        hdmi: 1,
        rs232: 4,
        audio_jack: {
          line_out: 2
        },
        lan: 'G-LAN (RJ45)',
        wireless: {
          wifi: 'Intel AX210 WIFI 6E',
          bluetooth: '5.2'
        },
        webcam: '2MP with Digital Mic',
        speaker: '2W x 2'
      },
      medical_grade_adapter: {
        input: '100~240V AC, 50~60Hz',
        output: '90W (19V @ 4.74A)',
        poe: 'POE++ (min. 802.3bt Type 3 Class 6)'
      },
      battery: 'Yes',
      thermal: 'Fanless',
      mechanical: {
        dimension_mm: 'W481.6 x L302 x T47.6',
        wall_mount_vesa_mm: [75, 100]
      },
      temperature: {
        operating: '0 ~ 40°C (32°F ~ 104°F)',
        storage: '-20 ~ 60°C (-4°F ~ 140°F)'
      },
      certifications: [
        'IEC60601-1:2005+A1:2015 (Ed.3.1)',
        'IEC60601-1-2:2014 (Ed.4.0)',
        'IEC60601-1-6:2010+A1:2013 (Ed.3.1)',
        'ANSI/AAMI ES60601-1:2005/A1:2012',
        'CAN/CSA-C22.2 No.60601-1-2',
        'CAN/CSA-C22.2 No.60601-1:14',
        'UL60950-1',
        'Energy Star 8.0',
        'FCC'
      ]
    }
  },
  {
    id: 'm215t',
    name: 'M215T',
    imagePath: '/product/m215t/image/M215T_600X600.png',
    specPath: '/product/m215t/spec/m240-m215_spec.pdf',
    specInfo: {
      model: 'M215T',
      cpu: 'Intel Tiger Lake 11th Gen (Celeron 6305E / i3-1115G4E / i5-1145G7E / i7-1185G7E)',
      tpm: true,
      graphics: 'Integrated Intel Graphics',
      memory: {
        slots: 2,
        max_capacity: '64GB DDR4'
      },
      storage: {
        type: 'M.2 NVMe SSD'
      },
      ai_accelerator: 'Hailo 8',
      os: 'Windows 10 IoT (optional)',
      display: {
        size: '22 inches',
        resolution: '1920 x 1080 FHD',
        touch: 'PCAP 10-point (supports gloves)',
        luminance_nits: 250,
        contrast_ratio: 1000
      },
      io: {
        usb_3_2: 2,
        usb_2_0: 5,
        hdmi_out: 1,
        rs232: 2,
        audio_combo_jack: 1,
        lan: 2
      },
      wireless: 'AX210 WIFI 6E 802.11 a/b/g/n/ac R2/ax R2 MIMO 2x2 + BT 5.2',
      audio: 'Speaker 3W x 2',
      webcam: '2MP with Digital Mic',
      reading_light: 'Included',
      safety_certifications: [
        'UL 60601-1-1',
        'EN 60601-2 4th Edition',
        'FCC',
        'CE Class B',
        'Energy Star 8.0'
      ]
    }
  },
  {
    id: 'm240',
    name: 'M240',
    imagePath: '/product/m240/image/M240_600X600.png',
    specPath: '/product/m240/spec/m240-m215_spec.pdf',
    specInfo: {
      model: 'M240',
      cpu: 'Intel Tiger Lake 11th Gen (Celeron 6305E / i3-1115G4E / i5-1145G7E / i7-1185G7E)',
      tpm: true,
      graphics: 'Integrated Intel Graphics',
      memory: {
        slots: 2,
        max_capacity: '64GB DDR4'
      },
      storage: {
        type: 'M.2 NVMe SSD'
      },
      ai_accelerator: 'Hailo 8',
      os: 'Windows 10 IoT (optional)',
      display: {
        size: '23.8 inches',
        resolution: '1920 x 1080 FHD',
        touch: 'PCAP 10-point (supports gloves)',
        luminance_nits: 250,
        contrast_ratio: 1000
      },
      io: {
        usb_3_2: 2,
        usb_2_0: 5,
        hdmi_out: 1,
        rs232: 2,
        audio_combo_jack: 1,
        lan: 2
      },
      wireless: 'AX210 WIFI 6E 802.11 a/b/g/n/ac R2/ax R2 MIMO 2x2 + BT 5.2',
      audio: 'Speaker 3W x 2',
      webcam: '2MP with Digital Mic',
      reading_light: 'Included',
      safety_certifications: [
        'UL 60601-1-1',
        'EN 60601-2 4th Edition',
        'FCC',
        'CE Class B',
        'Energy Star 8.0'
      ]
    }
  },
  {
    id: 'momi13',
    name: 'MOMI13',
    imagePath: '/product/momi13/image/MOMI13_600X600.png',
    specPath: '/product/momi13/spec/momi13_spec.pdf',
    specInfo: {
      model: 'MOMI13',
      processor: 'Intel Pentium N6415, Quad Core @1.2GHz, 1.5MB L2 Cache',
      platform: 'Intel',
      memory: '8GB DDR4',
      storage: '128GB M.2 NVMe SSD',
      os: 'Windows 10 IoT LTSC / Windows 11 IoT LTSC 2024',
      wireless: 'Wi-Fi 6E 802.11 b/g/n and above',
      bluetooth: 'BT 5.3',
      io: ['1 x USB 3.1 Type-A', '1 x USB Type-C (DP out / Power in)'],
      ethernet: '2 x RJ45 G-LAN',
      power: 'Medical Grade Adapter: 19VDC or 12~24V DC',
      operating_temperature: '10°C to 40°C (50°F to 95°F)',
      mechanical_dimension: '13.1 x 8.9 x 1.6 inches (334 x 226 x 40 mm)',
      weight: '3.9 lbs (1.78 kg)',
      display: {
        size: '13.3 inches (16:9)',
        resolution: '1920 x 1080 FHD',
        touch: 'PCAP 10-point (glove supported)',
        luminance_nits: 360,
        max_luminance_nits: 400
      },
      audio: '1 x Combo Jack',
      battery: 'Internal Li-ION Battery (3880mAh / 7.2V)',
      certification: [
        'AAMI ES60601-1:2005 + AMD1:2012 + AMD2:2021',
        'CAN/CSA-C22.2 NO. 60601-1:14/A2:2022',
        'IEC/EN 60601-1 / 60601-1-2 (latest amendments)',
        'IEC62368-1:2018 / EN IEC 62368-1:2020+A11:2020',
        'FCC part 15 Class B / ICES-003 Level B',
        'GB17625.1-2022, GB4943.1-2022, GB/T 9254.1-2021',
        'CCC (China), CE (Europe), UL, FCC, ICES-003 (US/Canada), VCCI (Japan), UKCA (UK), Energy Star'
      ]
    }
  },
  {
    id: 'ncon',
    name: 'NCON',
    imagePath: '/product/ncon/image/Edge-NCOX_600x600.png',
    specPath: '/product/ncon/spec/AIM-Edge ncon Y23V01.pdf',
    userGuidePath: '/product/ncon/userGuide/AIM-Edge ncox_ncon User Manual V1.3.pdf',
    specInfo: {
      model: 'NCON',
      processor: 'NVIDIA Jetson Orin Nano',
      platform: 'Nvidia',
      memory: '8GB / 4GB LPDDR5',
      storage: '1 x PCIe M.2 SSD (128GB)',
      os: 'Linux 5.1 / Ubuntu 20.04',
      io: '1 x USB 3.0 Type-A, 1 x USB 2.0 OTG Micro-AB, 1 x GPIO (DO), 1 x PWM',
      hdmi: '1 x Micro HDMI',
      power: '1 x DC-In 19V adaptor',
      operating_temperature: '-20 ~ 60°C',
      mechanical_dimension: '90(W) x 118(D) x 69(H) mm',
      camera: '1 x Gigabit Ethernet'
    }
  },
  {
    id: 'ncox',
    name: 'NCOX',
    imagePath: '/product/ncox/image/Edge-NCOX_600x600.png',
    specPath: '/product/ncox/spec/AIM-Edge ncox Y23V01.pdf',
    userGuidePath: '/product/ncox/userGuide/AIM-Edge ncox_ncon User Manual V1.3.pdf',
    specInfo: {
      model: 'NCOX',
      processor: 'Nvidia Jetson Orin NX',
      platform: 'Nvidia',
      memory: '16GB / 8GB LPDDR5',
      storage: '1 x PCIe M.2 SSD (256GB)',
      os: 'Linux 5.1 / Ubuntu 20.04',
      io: '1 x USB 3.0 Type-A, 1 x USB 2.0 OTG Micro-AB, 2 x GPIO (DO), 1 x PWM (0-10V)',
      button: '1 x Reset Button, 1 x Power Button, 1 x Recovery Button',
      hdmi: '1 x Micro HDMI',
      power: '1 x DC-In 19V adaptor',
      operating_temperature: '-20 ~ 60°C',
      mechanical_dimension: '90(W) x 118(D) x 69(H) mm',
      weight: 'TBD',
      camera: 'RJ45'
    }
  },
  {
    id: 'nx-h3003',
    name: 'NX-H3003',
    imagePath: '/product/nx-h3003/image/NX-H3003_600X600.png',
    specPath: '/product/nx-h3003/spec/E200G4.pdf',
    specInfo: {
      model: 'NX-H3003',
      form_factor: '256mm x 43.6mm x 165mm (10.07 x 1.72 x 6.5 inch)',
      processor: '11th Gen Intel® Core™ Processor, Up to 4 cores, 2-4MB Cache, TDP up to 15W',
      memory: '2 DDR4 channels, 2666/3200 MT/s, Max 64GB, In-Band ECC',
      expansion_slots:
        '2 x M.2 slots for AI & NVMe module, 1 x M.2 for NVMe & LoRa module, 1 x M.2 for WiFi/BT module, 1 x M.2 for 4G LTE/5G NR module',
      io: '2 x RJ45 2.5G with TSN, 1 x COM port (RS232/RS485), 2 x USB3.2, 2 x USB2.0, 1 x HDMI 2.0',
      networking:
        'Dual-WAN (5G & Ethernet) with Load Balancing and Failover, IPv4 / IPv6 routing, NAT / NAPT, DHCP Server & Client',
      system_management: 'LWM2M Client, Device Twin, Zero Touch Provisioning, OTA, Logs & Tracing',
      security: 'Firewall, IPsec VPN, TPM 2.0 (Optional)',
      antenna: '6 x external antennas',
      fan: 'Fanless',
      power_supply: '12V/5A, 60W',
      mounting: 'Standard / Wall Mount',
      operating_temperature: '-20°C ~ 60°C (at 0.7m/s air flow)',
      ip_rating: 'IP51',
      vibration: 'IEC 60068-2-64',
      shock: 'IEC 60068-2-27'
    }
  },
  {
    id: 'psox',
    name: 'PSOX',
    imagePath: '/product/psox/image/Edge-psox_600x600.png',
    specPath: '/product/psox/spec/AIM-Edge psox_pson User Manual V1.5.pdf',
    specInfo: {
      model: 'PSOX',
      processor: 'Nvidia Jetson Orin NX',
      platform: 'Nvidia',
      memory: '16GB / 8GB LPDDR5',
      storage: 'M.2 PCIe NVMe SSD',
      os: 'NVIDIA JetPack (Linux 5.10 / Ubuntu 20.04)',
      io: '1 x USB 2.0 Micro-B, 4 x USB 3.1 Gen1 Type-A',
      button: '1 x Reset Button, 1 x Recovery Button, 1 x Power Button',
      ethernet: '2 x Gigabit Ethernet',
      hdmi: '1 x Micro HDMI',
      power: 'DC 12~19V',
      operating_temperature: '-20 ~ 60°C',
      mechanical_dimension: '94(W) x 157(D) x 70.75(H) mm',
      weight: '888g ±5g',
      di_do: '8 x Digital IO (4 x DI, 4 x DO)'
    }
  },
  {
    id: 'pson',
    name: 'PSON',
    imagePath: '/product/pson/image/Edge-psox_600x600.png',
    specPath: '/product/pson/spec/AIM-Edge psox_pson User Manual V1.5.pdf',
    specInfo: {
      model: 'PSON',
      processor: '6-core Arm Cortex-A78AE v8.2 64-bit CPU, 1.5MB L2 + 4MB L3',
      platform: 'Nvidia',
      memory: '8GB / 4GB LPDDR5',
      storage: '1 x M.2 PCIe NVMe SSD',
      os: 'NVIDIA JetPack (based on Linux 5.10 / Ubuntu 20.04)',
      io: '4 x USB 3.1 Gen1 Type-A, 1 x USB 2.0 Micro-B, 8 x Digital IO (4 x DI, 4 x DO)',
      hdmi: 'Micro HDMI',
      power: 'DC 12~19V',
      operating_temperature: '-20 ~ 60°C',
      mechanical_dimension: '94(W) x 157(D) x 70.75(H) mm',
      weight: '888g ± 5g'
    }
  },
  {
    id: 'qc01',
    name: 'QC01',
    imagePath: '/product/qc01/image/QC-01_600X600.png',
    specPath: '/product/qc01/spec/qc01_spec.pdf',
    userGuidePath: '/product/qc01/userGuide/QC01W-UserGuide-v1.0.pdf',
    specInfo: {
      model: 'QC01',
      processor: 'QCS6490',
      platform: 'Qualcomm',
      tops: 12,
      ai_accelerator: 'Qualcomm DSP',
      memory: '8GB LPDDR4x RAM',
      storage: '128GB UFS Flash (uMCP)',
      os: 'Qualcomm Linux / Windows 11 IOT / Linux Ubuntu / Android 13',
      wireless: 'WiFi 802.11 ax',
      bluetooth: 'Bluetooth 5.2',
      io: '4 x USB 3.0 Type-A, 1 x USB 3.0 Type-C',
      button: '1 x Reset, 1 x Recovery, 1 x Power, 1 x Function',
      ethernet: '2 x RJ45 LAN (10G + 1G)',
      hdmi: '1 x HDMI (Type-A)',
      power: 'DC-In 19V adapter',
      mechanical_dimension: '95(W) x 130(D) x 40(H) mm',
      di_do: '2DI / 2DO'
    }
  },
  {
    id: 'top1',
    name: 'TOP1',
    imagePath: '/product/top1/image/Edge-top1_600X600.png',
    specPath: '/product/top1/spec/AIM-Edge TOP1 User Manual V1.4.pdf',
    specInfo: {
      model: 'TOP1',
      processor: 'NVIDIA Jetson Orin NX 16GB',
      os: 'Ubuntu 20.04 / Linux 5.10',
      tpm: 'Infineon TPM SLB9670',
      io: '2 x Gigabit Ethernet, 4 x USB 3.1 Gen1 Type-A, 1 x USB 2.0 Type-A, 1 x USB 3.1 Gen1 Type-C (for image recovery & data), 2 x HDMI 2.0, 8 x GMSL Camera (4 in 1 x 2), 1 x Audio In/Out, 1 x CAN Bus (D Sub 9 pin), 1 x Nvidia 40 pin expansion header (2x20, 2.54 mm pitch), 1 x Power LED, 1 x PCIe NVMe SSD internal M.2, 1 x Debug UART (internal)',
      power: 'Vehicle Battery 10V~32V, DC In 19V',
      mechanical_dimension: '170 mm (W) x 145 mm (L) x 75 mm (H)',
      weight: '1790g',
      operating_temperature: '-20 ~ 60°C',
      button: '1 x Power Button, 1 x Recovery Button, 1 x Reset Button'
    }
  },
  {
    id: 'ucon',
    name: 'UCON',
    imagePath: '/product/ucon/image/Edge-ucon_600X600.png',
    specPath: '/product/ucon/spec/AIM-Edge ucon Y23V03.pdf',
    userGuidePath: '/product/ucon/userGuide/AIM-Edge ucon User Manual V1.10[21].pdf',
    specInfo: {
      model: 'UCON',
      processor: 'Nvidia Orin Nano',
      platform: 'Nvidia',
      memory: '4GB / 8GB LPDDR5 (Built in SoM)',
      storage: 'M.2 Key-M PCIe NVMe SSD',
      os: 'Ubuntu 20.04',
      ethernet: 'GBE/802.3bt PoE PD x 1',
      power: 'PoE PD IEEE 802.3bt DC-IN 12V/6A',
      operating_temperature: '-20 ~ 60°C',
      mechanical_dimension: 'L: 295mm x W: 110mm (with cap) x H: 120mm (with base and cap)',
      weight: '2.8kg (not included wall mount)',
      camera: 'Sony Starvis™ IMX462 Sensor size: 1/2.8” progressive CMOS sensor Pixel…',
      certification: 'IP66, FCC, BSMI, CE, VCCI'
    }
  }
]

// Helper function to format product name to uppercase
export const formatProductName = (productId) => {
  return productId.toUpperCase().replace(/-/g, '-')
}
