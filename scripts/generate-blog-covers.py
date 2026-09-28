#!/usr/bin/env python3
"""
Generate ultra-clean, high-aesthetic 1200x675 cover images for blog posts and services using Cairo.
Includes sleek dark tech themes, rich color gradients, glowing accents, glassmorphic UI panels,
metrics, and refined typography.
"""

import math
import os
try:
    import cairo
except ImportError:
    print("[generate-blog-covers] PyCairo not installed. Skipping cover generation. Using existing covers.")
    raise SystemExit(0)


# Blog Post definitions
POSTS = [
    {
        "slug": "outbound-list-why-now-field",
        "category": "LEAD GENERATION PLAYBOOK",
        "title": "Why Your Outbound List Needs a 'Why Now' Field",
        "subtitle": "Convert cold prospects into timely sales conversations with timing signals",
        "primary_color": (0.15, 0.45, 0.95),   # Electric blue
        "secondary_color": (0.05, 0.85, 0.95), # Cyan
        "accent_color": (0.45, 0.25, 0.95),    # Violet
        "type": "lead_gen",
        "is_service": False,
    },
    {
        "slug": "repeatable-revenue-system",
        "category": "MARKETING AUTOMATION & WORKFLOWS",
        "title": "Turn One Won Deal into a Repeatable System",
        "subtitle": "Reverse-engineer sales wins into automated n8n playbooks and workflows",
        "primary_color": (0.05, 0.75, 0.50),   # Emerald green
        "secondary_color": (0.15, 0.85, 0.70), # Mint/Teal
        "accent_color": (0.10, 0.55, 0.90),    # Blue
        "type": "automation",
        "is_service": False,
    },
    {
        "slug": "linkedin-prospecting-through-conversations",
        "category": "LINKEDIN PROSPECTING",
        "title": "Prospect in Communities, Not Cold Search",
        "subtitle": "Engage warm buyers where they already discuss problems in public",
        "primary_color": (0.55, 0.30, 0.95),   # Purple/Violet
        "secondary_color": (0.20, 0.55, 0.95), # Electric Blue
        "accent_color": (0.90, 0.25, 0.65),    # Pink
        "type": "linkedin",
        "is_service": False,
    },
    {
        "slug": "find-your-best-channel-in-30-days",
        "category": "SAAS GROWTH & TESTING",
        "title": "Find Your Best Growth Channel in 30 Days",
        "subtitle": "Rapid multi-channel experimentation to lock in your highest-ROI engine",
        "primary_color": (0.95, 0.55, 0.10),   # Amber/Orange
        "secondary_color": (0.95, 0.25, 0.40), # Coral
        "accent_color": (0.65, 0.25, 0.90),    # Violet
        "type": "growth",
        "is_service": False,
    },
    {
        "slug": "content-calendar-search-intent",
        "category": "SEO & CONTENT STRATEGY",
        "title": "Plan Content Around Search Intent, Not Word Count",
        "subtitle": "Map buyer queries to high-converting content assets that actually rank",
        "primary_color": (0.10, 0.50, 0.95),   # Royal Blue
        "secondary_color": (0.25, 0.80, 0.95), # Sky Cyan
        "accent_color": (0.40, 0.30, 0.85),    # Indigo
        "type": "seo",
        "is_service": False,
    },
    # Services definitions
    {
        "slug": "cold-email-marketing",
        "category": "COLD EMAIL MARKETING",
        "title": "High-Reply Cold Email Sequences & Deliverability",
        "subtitle": "Short, punchy email templates and multi-step follow-ups optimized for 99%+ deliverability",
        "primary_color": (0.95, 0.25, 0.40),   # Rose
        "secondary_color": (0.98, 0.55, 0.65), # Coral
        "accent_color": (0.45, 0.25, 0.95),    # Violet
        "type": "cold_email",
        "is_service": True,
    },
    {
        "slug": "b2b-research-list-building",
        "category": "B2B RESEARCH & LIST BUILDING",
        "title": "Verified B2B Prospect Lists & Waterfall Data",
        "subtitle": "100% human-verified prospect databases using Apollo, Clay, and zero bounce algorithms",
        "primary_color": (0.95, 0.65, 0.15),   # Amber
        "secondary_color": (0.98, 0.85, 0.35), # Gold
        "accent_color": (0.15, 0.75, 0.95),    # Cyan
        "type": "list_building",
        "is_service": True,
    },
    {
        "slug": "marketing-automation-ai-workflows",
        "category": "MARKETING AUTOMATION & AI",
        "title": "Connecting n8n, AI & CRM for Lead Enrichment",
        "subtitle": "Custom automated workflows that scrape prospect intel, score leads, and push to CRM",
        "primary_color": (0.05, 0.75, 0.85),   # Cyan
        "secondary_color": (0.15, 0.85, 0.65), # Teal
        "accent_color": (0.10, 0.45, 0.95),    # Blue
        "type": "automation_ai",
        "is_service": True,
    },
    {
        "slug": "saas-promotion-ltd-campaigns",
        "category": "SAAS PROMOTION & LAUNCHES",
        "title": "Lifetime Deals, AppSumo & Viral Giveaways",
        "subtitle": "Playbooks for scaling early user acquisition, LTD promotions, and Product Hunt launches",
        "primary_color": (0.90, 0.25, 0.65),   # Pink
        "secondary_color": (0.80, 0.25, 0.95), # Purple
        "accent_color": (0.95, 0.60, 0.20),    # Orange
        "type": "saas_promotion",
        "is_service": True,
    },
    {
        "slug": "saas-development",
        "category": "SAAS DEVELOPMENT",
        "title": "Modern Full-Stack SaaS Architecture",
        "subtitle": "Scalable web apps built with Next.js, Supabase, Tailwind CSS and micro-SaaS engineering",
        "primary_color": (0.05, 0.65, 0.75),   # Teal
        "secondary_color": (0.25, 0.55, 0.95), # Electric Blue
        "accent_color": (0.55, 0.35, 0.95),    # Violet
        "type": "saas_dev",
        "is_service": True,
    },
]

WIDTH = 1200
HEIGHT = 675

def rounded_rect(cr, x, y, w, h, r):
    """Draw a smooth rounded rectangle."""
    cr.new_sub_path()
    cr.arc(x + w - r, y + r, r, -math.pi / 2, 0)
    cr.arc(x + w - r, y + h - r, r, 0, math.pi / 2)
    cr.arc(x + r, y + h - r, r, math.pi / 2, math.pi)
    cr.arc(x + r, y + r, r, math.pi, 3 * math.pi / 2)
    cr.close_path()

def draw_background(cr, p):
    # Deep obsidian slate background
    bg_grad = cairo.LinearGradient(0, 0, WIDTH, HEIGHT)
    bg_grad.add_color_stop_rgb(0, 0.04, 0.06, 0.10)
    bg_grad.add_color_stop_rgb(0.5, 0.05, 0.07, 0.13)
    bg_grad.add_color_stop_rgb(1, 0.03, 0.04, 0.08)
    cr.set_source(bg_grad)
    cr.paint()

    # Ambient radial glow behind the right visual area
    glow1 = cairo.RadialGradient(880, 340, 10, 880, 340, 480)
    glow1.add_color_stop_rgba(0, p["primary_color"][0], p["primary_color"][1], p["primary_color"][2], 0.28)
    glow1.add_color_stop_rgba(0.5, p["secondary_color"][0], p["secondary_color"][1], p["secondary_color"][2], 0.12)
    glow1.add_color_stop_rgba(1, 0, 0, 0, 0)
    cr.set_source(glow1)
    cr.paint()

    # Secondary glow top left
    glow2 = cairo.RadialGradient(200, 100, 5, 200, 100, 350)
    glow2.add_color_stop_rgba(0, p["accent_color"][0], p["accent_color"][1], p["accent_color"][2], 0.15)
    glow2.add_color_stop_rgba(1, 0, 0, 0, 0)
    cr.set_source(glow2)
    cr.paint()

    # Subtle tech dot grid
    cr.set_source_rgba(1, 1, 1, 0.04)
    for x in range(40, WIDTH, 40):
        for y in range(40, HEIGHT, 40):
            cr.arc(x, y, 1.2, 0, 2 * math.pi)
            cr.fill()

    # Elegant horizontal accent light lines
    line_grad = cairo.LinearGradient(0, 0, WIDTH, 0)
    line_grad.add_color_stop_rgba(0, 1, 1, 1, 0)
    line_grad.add_color_stop_rgba(0.4, p["primary_color"][0], p["primary_color"][1], p["primary_color"][2], 0.25)
    line_grad.add_color_stop_rgba(0.8, p["secondary_color"][0], p["secondary_color"][1], p["secondary_color"][2], 0.25)
    line_grad.add_color_stop_rgba(1, 1, 1, 1, 0)
    cr.set_source(line_grad)
    cr.set_line_width(1)
    cr.move_to(0, 60)
    cr.line_to(WIDTH, 60)
    cr.stroke()
    cr.move_to(0, HEIGHT - 50)
    cr.line_to(WIDTH, HEIGHT - 50)
    cr.stroke()

def draw_header_and_title(cr, p):
    # Category badge
    badge_x, badge_y, badge_w, badge_h = 70, 95, 305, 36
    rounded_rect(cr, badge_x, badge_y, badge_w, badge_h, 18)
    cr.set_source_rgba(p["primary_color"][0], p["primary_color"][1], p["primary_color"][2], 0.15)
    cr.fill_preserve()
    cr.set_source_rgba(p["primary_color"][0], p["primary_color"][1], p["primary_color"][2], 0.5)
    cr.set_line_width(1.5)
    cr.stroke()

    # Glowing dot in badge
    cr.arc(badge_x + 20, badge_y + 18, 4.5, 0, 2 * math.pi)
    cr.set_source_rgb(*p["secondary_color"])
    cr.fill()

    # Badge text
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(12)
    cr.set_source_rgb(0.85, 0.92, 1.0)
    cr.move_to(badge_x + 36, badge_y + 22)
    cr.show_text(p["category"])

    # Accurately wrap title using text_extents
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(34)
    words = p["title"].split()
    lines = []
    current_line = []
    max_title_w = 440

    for w in words:
        test_line = " ".join(current_line + [w])
        if cr.text_extents(test_line).width > max_title_w and current_line:
            lines.append(" ".join(current_line))
            current_line = [w]
        else:
            current_line.append(w)
    if current_line:
        lines.append(" ".join(current_line))

    y_text = 195
    for i, line in enumerate(lines[:3]):
        # Highlight second line with subtle color gradient or secondary color
        if i == 1:
            title_grad = cairo.LinearGradient(70, y_text, 400, y_text)
            title_grad.add_color_stop_rgb(0, 0.95, 0.98, 1.0)
            title_grad.add_color_stop_rgb(1, *p["secondary_color"])
            cr.set_source(title_grad)
        else:
            cr.set_source_rgb(1.0, 1.0, 1.0)

        cr.move_to(70, y_text)
        cr.show_text(line)
        y_text += 48

    # Subtitle wrapping
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    cr.set_font_size(16.5)
    sub_words = p["subtitle"].split()
    sub_lines = []
    cur_sub = []
    max_sub_w = 450

    for w in sub_words:
        test_sub = " ".join(cur_sub + [w])
        if cr.text_extents(test_sub).width > max_sub_w and cur_sub:
            sub_lines.append(" ".join(cur_sub))
            cur_sub = [w]
        else:
            cur_sub.append(w)
    if cur_sub:
        sub_lines.append(" ".join(cur_sub))

    cr.set_source_rgba(0.70, 0.80, 0.92, 0.88)
    y_sub = y_text + 16
    for line in sub_lines[:3]:
        cr.move_to(70, y_sub)
        cr.show_text(line)
        y_sub += 26

    # Bottom branding badge
    brand_y = HEIGHT - 90
    rounded_rect(cr, 70, brand_y, 340, 34, 8)
    cr.set_source_rgba(1, 1, 1, 0.04)
    cr.fill_preserve()
    cr.set_source_rgba(1, 1, 1, 0.1)
    cr.set_line_width(1)
    cr.stroke()

    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(12)
    cr.set_source_rgb(0.5, 0.75, 1.0)
    cr.move_to(84, brand_y + 21)
    cr.show_text("CONVO DIGITAL")

    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    cr.set_source_rgba(0.7, 0.8, 0.9, 0.8)
    cr.move_to(200, brand_y + 21)
    cr.show_text("· Mizanur Rahman Momin")

def draw_visual_panel(cr, p):
    ptype = p["type"]
    panel_x, panel_y, panel_w, panel_h = 600, 110, 530, 450

    # Main Card Base (Glassmorphism)
    rounded_rect(cr, panel_x, panel_y, panel_w, panel_h, 24)
    cr.set_source_rgba(0.08, 0.11, 0.18, 0.82)
    cr.fill_preserve()
    # Gradient border
    border_grad = cairo.LinearGradient(panel_x, panel_y, panel_x + panel_w, panel_y + panel_h)
    border_grad.add_color_stop_rgba(0, *p["secondary_color"], 0.7)
    border_grad.add_color_stop_rgba(0.5, *p["primary_color"], 0.3)
    border_grad.add_color_stop_rgba(1, 1, 1, 1, 0.08)
    cr.set_source(border_grad)
    cr.set_line_width(1.8)
    cr.stroke()

    # Panel Header Bar
    rounded_rect(cr, panel_x, panel_y, panel_w, 54, 24)
    cr.set_source_rgba(0.12, 0.16, 0.25, 0.9)
    cr.fill()
    # 3 Window dots
    cr.arc(panel_x + 28, panel_y + 27, 5, 0, 2 * math.pi)
    cr.set_source_rgb(0.95, 0.35, 0.35)
    cr.fill()
    cr.arc(panel_x + 46, panel_y + 27, 5, 0, 2 * math.pi)
    cr.set_source_rgb(0.95, 0.75, 0.25)
    cr.fill()
    cr.arc(panel_x + 64, panel_y + 27, 5, 0, 2 * math.pi)
    cr.set_source_rgb(0.35, 0.85, 0.45)
    cr.fill()

    # Panel Title
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13)
    cr.set_source_rgb(0.85, 0.92, 1.0)
    cr.move_to(panel_x + 95, panel_y + 32)

    if ptype == "lead_gen":
        cr.show_text("B2B Outbound Intelligence Matrix")
        draw_lead_gen_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "automation":
        cr.show_text("Revenue System Engine (n8n Blueprint)")
        draw_automation_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "linkedin":
        cr.show_text("Social Prospecting & Conversation Funnel")
        draw_linkedin_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "growth":
        cr.show_text("30-Day Channel Experimentation Hub")
        draw_growth_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "seo":
        cr.show_text("Search Intent Content Hierarchy Matrix")
        draw_seo_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "cold_email":
        cr.show_text("Outreach Campaign & Deliverability Hub")
        draw_cold_email_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "list_building":
        cr.show_text("Waterfall Data & Zero-Bounce Verification")
        draw_list_building_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "automation_ai":
        cr.show_text("n8n + LLM Lead Scoring Integration")
        draw_automation_ai_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "saas_promotion":
        cr.show_text("LTD Campaign & Product Launch Hub")
        draw_saas_promotion_content(cr, panel_x, panel_y, panel_w, panel_h, p)
    elif ptype == "saas_dev":
        cr.show_text("Modern Next.js & Supabase Tech Stack")
        draw_saas_dev_content(cr, panel_x, panel_y, panel_w, panel_h, p)

def draw_lead_gen_content(cr, px, py, pw, ph, p):
    rows = [
        {"title": "VP Sales @ ScaleGrid", "signal": "Trigger: Raised $18M Series A", "status": "Ready to Contact", "badge_col": (0.1, 0.8, 0.4)},
        {"title": "Head of RevOps @ FinSaaS", "signal": "Trigger: Hiring 6 Enterprise SDRs", "status": "High Relevance", "badge_col": (0.2, 0.6, 1.0)},
        {"title": "Founder & CEO @ CloudAI", "signal": "Trigger: New product launch v2.0", "status": "Timely Outreach", "badge_col": (0.8, 0.4, 0.9)},
    ]
    cur_y = py + 72
    for r in rows:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 78, 12)
        cr.set_source_rgba(0.12, 0.16, 0.26, 0.7)
        cr.fill_preserve()
        cr.set_source_rgba(1, 1, 1, 0.08)
        cr.set_line_width(1)
        cr.stroke()

        cr.arc(px + 45, cur_y + 39, 16, 0, 2 * math.pi)
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.fill_preserve()
        cr.set_source_rgb(*p["secondary_color"])
        cr.set_line_width(1.2)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(0.95, 0.98, 1.0)
        cr.move_to(px + 72, cur_y + 32)
        cr.show_text(r["title"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + 72, cur_y + 54)
        cr.show_text(r["signal"])

        badge_w = 118
        bx = px + pw - badge_w - 35
        by = cur_y + 25
        rounded_rect(cr, bx, by, badge_w, 28, 14)
        cr.set_source_rgba(r["badge_col"][0], r["badge_col"][1], r["badge_col"][2], 0.18)
        cr.fill_preserve()
        cr.set_source_rgba(r["badge_col"][0], r["badge_col"][1], r["badge_col"][2], 0.7)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(*r["badge_col"])
        cr.move_to(bx + 10, by + 18)
        cr.show_text(r["status"])

        cur_y += 92

    stat_y = cur_y + 8
    rounded_rect(cr, px + 20, stat_y, 235, 48, 10)
    cr.set_source_rgba(*p["primary_color"], 0.18)
    cr.fill_preserve()
    cr.set_source_rgba(*p["primary_color"], 0.45)
    cr.set_line_width(1)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(16)
    cr.set_source_rgb(0.3, 0.8, 1.0)
    cr.move_to(px + 35, stat_y + 31)
    cr.show_text("3.8x Reply Rate")

    rounded_rect(cr, px + 275, stat_y, 235, 48, 10)
    cr.set_source_rgba(0.1, 0.8, 0.4, 0.15)
    cr.fill_preserve()
    cr.set_source_rgba(0.1, 0.8, 0.4, 0.4)
    cr.set_line_width(1)
    cr.stroke()
    cr.set_font_size(16)
    cr.set_source_rgb(0.3, 0.95, 0.55)
    cr.move_to(px + 295, stat_y + 31)
    cr.show_text("Verified Signals")

def draw_automation_content(cr, px, py, pw, ph, p):
    steps = [
        {"num": "01", "name": "Won Deal Closed", "detail": "Deal context & buyer triggers logged", "badge": "INPUT"},
        {"num": "02", "name": "Reverse Pattern", "detail": "Extract ICP, pain point, hook", "badge": "ANALYSIS"},
        {"num": "03", "name": "Auto-Systemized", "detail": "n8n sequence + enriched prospect list", "badge": "SCALE"},
    ]
    cur_y = py + 74
    for i, s in enumerate(steps):
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.10, 0.18, 0.22, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.35)
        cr.set_line_width(1)
        cr.stroke()

        cr.arc(px + 52, cur_y + 40, 20, 0, 2 * math.pi)
        cr.set_source_rgba(*p["secondary_color"], 0.2)
        cr.fill_preserve()
        cr.set_source_rgb(*p["secondary_color"])
        cr.set_line_width(1.5)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13)
        cr.set_source_rgb(0.9, 1.0, 0.95)
        cr.move_to(px + 44, cur_y + 45)
        cr.show_text(s["num"])

        cr.set_font_size(14)
        cr.set_source_rgb(1.0, 1.0, 1.0)
        cr.move_to(px + 86, cur_y + 32)
        cr.show_text(s["name"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgba(0.7, 0.85, 0.8, 0.9)
        cr.move_to(px + 86, cur_y + 54)
        cr.show_text(s["detail"])

        rounded_rect(cr, px + pw - 110, cur_y + 26, 75, 26, 6)
        cr.set_source_rgba(*p["primary_color"], 0.25)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + pw - 98, cur_y + 43)
        cr.show_text(s["badge"])

        if i < 2:
            cr.set_source_rgba(*p["secondary_color"], 0.6)
            cr.set_line_width(2)
            cr.move_to(px + pw / 2, cur_y + 80)
            cr.line_to(px + pw / 2, cur_y + 96)
            cr.stroke()

        cur_y += 98

    out_y = cur_y + 6
    rounded_rect(cr, px + 20, out_y, pw - 40, 50, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1)
    cr.stroke()

    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(0.8, 1.0, 0.85)
    cr.move_to(px + 38, out_y + 31)
    cr.show_text("Result: Predictable Revenue Pipeline (0 to Repeatable)")

def draw_linkedin_content(cr, px, py, pw, ph, p):
    cards = [
        {
            "header": "Community Thread (Founders & Operators)",
            "text": "\"Need an agency that actually builds verified lists with custom triggers...\"",
            "replies": "14 replies · 28 active comments",
            "border": p["secondary_color"]
        },
        {
            "header": "High-Value Interaction Match",
            "text": "Sarah Jenkins (VP Growth) asked for outreach framework",
            "replies": "⚡ Direct Conversation Opportunity Started",
            "border": p["accent_color"]
        },
    ]
    cur_y = py + 74
    for c in cards:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 110, 14)
        cr.set_source_rgba(0.13, 0.12, 0.24, 0.8)
        cr.fill_preserve()
        cr.set_source_rgba(c["border"][0], c["border"][1], c["border"][2], 0.5)
        cr.set_line_width(1.2)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(12.5)
        cr.set_source_rgb(*c["border"])
        cr.move_to(px + 40, cur_y + 30)
        cr.show_text(c["header"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(13.5)
        cr.set_source_rgb(0.92, 0.95, 1.0)
        cr.move_to(px + 40, cur_y + 60)
        cr.show_text(c["text"])

        cr.set_font_size(11.5)
        cr.set_source_rgba(0.7, 0.75, 0.9, 0.85)
        cr.move_to(px + 40, cur_y + 88)
        cr.show_text(c["replies"])

        cur_y += 128

    rounded_rect(cr, px + 20, cur_y + 5, 235, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgba(*p["primary_color"], 0.5)
    cr.set_line_width(1)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(15)
    cr.set_source_rgb(0.85, 0.65, 1.0)
    cr.move_to(px + 36, cur_y + 37)
    cr.show_text("64% Reply Rate")

    rounded_rect(cr, px + 275, cur_y + 5, 235, 52, 10)
    cr.set_source_rgba(*p["secondary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgba(*p["secondary_color"], 0.5)
    cr.set_line_width(1)
    cr.stroke()
    cr.set_source_rgb(0.5, 0.85, 1.0)
    cr.move_to(px + 295, cur_y + 37)
    cr.show_text("Warm Pipeline")

def draw_growth_content(cr, px, py, pw, ph, p):
    channels = [
        {"name": "Cold Outbound Email", "score": 0.88, "metric": "Winner · 14.8% Reply Rate", "color": p["primary_color"]},
        {"name": "LinkedIn Direct Outreach", "score": 0.62, "metric": "Tested · 8.2% Reply Rate", "color": p["secondary_color"]},
        {"name": "Paid Social Acquisition", "score": 0.35, "metric": "Tested · High CAC", "color": (0.6, 0.6, 0.7)},
    ]
    cur_y = py + 72
    for ch in channels:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.18, 0.13, 0.12, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(ch["color"][0], ch["color"][1], ch["color"][2], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(1.0, 0.95, 0.9)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(ch["name"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgb(*ch["color"])
        cr.move_to(px + 38, cur_y + 50)
        cr.show_text(ch["metric"])

        bar_x = px + 280
        bar_w = 200
        rounded_rect(cr, bar_x, cur_y + 28, bar_w, 14, 7)
        cr.set_source_rgba(0, 0, 0, 0.4)
        cr.fill()

        fill_w = bar_w * ch["score"]
        rounded_rect(cr, bar_x, cur_y + 28, fill_w, 14, 7)
        bar_grad = cairo.LinearGradient(bar_x, 0, bar_x + fill_w, 0)
        bar_grad.add_color_stop_rgb(0, *p["secondary_color"])
        bar_grad.add_color_stop_rgb(1, *p["primary_color"])
        cr.set_source(bar_grad)
        cr.fill()

        cur_y += 94

    g_y = cur_y + 4
    rounded_rect(cr, px + 20, g_y, pw - 40, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.18)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1.2)
    cr.stroke()

    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(1.0, 0.85, 0.5)
    cr.move_to(px + 40, g_y + 32)
    cr.show_text("30-Day Sprint: Test 3 ➔ Measure 1 ➔ Scale Winning Engine")

def draw_seo_content(cr, px, py, pw, ph, p):
    layers = [
        {"stage": "Top: High Search Intent", "desc": "Specific buyer question & purchase triggers", "badge": "Rank #1", "col": (0.2, 0.85, 0.5)},
        {"stage": "Middle: Commercial Evaluation", "desc": "Comparison, alternative & teardown frameworks", "badge": "Conversion", "col": (0.2, 0.65, 1.0)},
        {"stage": "Base: Informational Traffic", "desc": "Broad problem understanding & education", "badge": "Authority", "col": (0.5, 0.4, 0.95)},
    ]
    cur_y = py + 74
    for l in layers:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.09, 0.15, 0.25, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(l["col"][0], l["col"][1], l["col"][2], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(14)
        cr.set_source_rgb(*l["col"])
        cr.move_to(px + 40, cur_y + 32)
        cr.show_text(l["stage"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12.5)
        cr.set_source_rgb(0.85, 0.92, 1.0)
        cr.move_to(px + 40, cur_y + 56)
        cr.show_text(l["desc"])

        rounded_rect(cr, px + pw - 125, cur_y + 26, 90, 28, 8)
        cr.set_source_rgba(l["col"][0], l["col"][1], l["col"][2], 0.2)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(11)
        cr.set_source_rgb(*l["col"])
        cr.move_to(px + pw - 112, cur_y + 45)
        cr.show_text(l["badge"])

        cur_y += 94

    s_y = cur_y + 6
    rounded_rect(cr, px + 20, s_y, pw - 40, 50, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(0.7, 0.9, 1.0)
    cr.move_to(px + 40, s_y + 31)
    cr.show_text("Outcome: Top rankings on keywords with direct buying intent")

def draw_cold_email_content(cr, px, py, pw, ph, p):
    steps = [
        {"name": "Step 1: Observation Hook", "open": "68.4% Open Rate", "reply": "18.2% Reply", "status": "Winner"},
        {"name": "Step 2: Social Proof Asset", "open": "56.2% Open Rate", "reply": "11.5% Reply", "status": "Active"},
        {"name": "Step 3: Permission-Based CTA", "open": "49.8% Open Rate", "reply": "8.4% Reply", "status": "Active"},
    ]
    cur_y = py + 72
    for s in steps:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.20, 0.12, 0.15, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(1.0, 0.95, 0.95)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(s["name"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgb(0.9, 0.8, 0.85)
        cr.move_to(px + 38, cur_y + 52)
        cr.show_text(f"{s['open']} · {s['reply']}")

        rounded_rect(cr, px + pw - 110, cur_y + 26, 75, 26, 6)
        cr.set_source_rgba(*p["primary_color"], 0.25)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(11)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + pw - 98, cur_y + 43)
        cr.show_text(s["status"])

        cur_y += 94

    stat_y = cur_y + 4
    rounded_rect(cr, px + 20, stat_y, 235, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgba(*p["primary_color"], 0.5)
    cr.set_line_width(1)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(15)
    cr.set_source_rgb(1.0, 0.7, 0.75)
    cr.move_to(px + 36, stat_y + 36)
    cr.show_text("99.4% Inbox Placement")

    rounded_rect(cr, px + 275, stat_y, 235, 52, 10)
    cr.set_source_rgba(0.1, 0.8, 0.4, 0.18)
    cr.fill_preserve()
    cr.set_source_rgba(0.1, 0.8, 0.4, 0.4)
    cr.set_line_width(1)
    cr.stroke()
    cr.set_source_rgb(0.4, 0.95, 0.6)
    cr.move_to(px + 295, stat_y + 36)
    cr.show_text("0.1% Bounce Rate")

def draw_list_building_content(cr, px, py, pw, ph, p):
    prospects = [
        {"name": "Alex Vance · CloudMetric", "verified": "✓ 100% VALID", "title": "VP of Revenue Operations"},
        {"name": "Sarah Jenkins · SaaSFlow", "verified": "✓ 100% VALID", "title": "Head of Growth Marketing"},
        {"name": "David Kaufman · SyncLab", "verified": "✓ 100% VALID", "title": "Founder & Co-CEO"},
    ]
    cur_y = py + 72
    for pr in prospects:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.20, 0.16, 0.10, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(1.0, 0.98, 0.9)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(pr["name"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgb(0.9, 0.85, 0.7)
        cr.move_to(px + 38, cur_y + 52)
        cr.show_text(pr["title"])

        rounded_rect(cr, px + pw - 135, cur_y + 26, 100, 26, 6)
        cr.set_source_rgba(0.1, 0.8, 0.4, 0.2)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(0.3, 0.95, 0.5)
        cr.move_to(px + pw - 128, cur_y + 43)
        cr.show_text(pr["verified"])

        cur_y += 94

    b_y = cur_y + 4
    rounded_rect(cr, px + 20, b_y, pw - 40, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1.2)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(1.0, 0.9, 0.6)
    cr.move_to(px + 38, b_y + 32)
    cr.show_text("Waterfall Verification: Apollo + Clay + Triple SMTP Test")

def draw_automation_ai_content(cr, px, py, pw, ph, p):
    nodes = [
        {"title": "Webhook: Ingest Intent Event", "desc": "Triggered on funding, hiring, or visitor action"},
        {"title": "AI Agent: LLM Lead Scorer", "desc": "Scrapes LinkedIn & classifies ICP match"},
        {"title": "CRM Sync: Instant Routing", "desc": "Pushes to HubSpot & initiates custom sequence"},
    ]
    cur_y = py + 72
    for n in nodes:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.08, 0.16, 0.22, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(0.85, 0.98, 1.0)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(n["title"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgba(0.7, 0.85, 0.9, 0.9)
        cr.move_to(px + 38, cur_y + 52)
        cr.show_text(n["desc"])

        rounded_rect(cr, px + pw - 100, cur_y + 26, 68, 26, 6)
        cr.set_source_rgba(*p["primary_color"], 0.25)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + pw - 88, cur_y + 43)
        cr.show_text("n8n AI")

        cur_y += 94

    b_y = cur_y + 4
    rounded_rect(cr, px + 20, b_y, pw - 40, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1.2)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(0.7, 1.0, 0.9)
    cr.move_to(px + 38, b_y + 32)
    cr.show_text("Latency: < 15s Lead Processing & Dynamic Sequence Launch")

def draw_saas_promotion_content(cr, px, py, pw, ph, p):
    metrics = [
        {"title": "#1 Product of the Day", "sub": "Product Hunt Launch with 1,200+ Upvotes", "badge": "WINNER"},
        {"title": "$140,000+ LTD Campaign GMV", "sub": "AppSumo & Community early adopter scale", "badge": "REVENUE"},
        {"title": "12,000+ Active Users", "sub": "Viral referral loops and social proof engine", "badge": "GROWTH"},
    ]
    cur_y = py + 72
    for m in metrics:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.22, 0.12, 0.20, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(1.0, 0.95, 1.0)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(m["title"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgb(0.9, 0.8, 0.9)
        cr.move_to(px + 38, cur_y + 52)
        cr.show_text(m["sub"])

        rounded_rect(cr, px + pw - 110, cur_y + 26, 78, 26, 6)
        cr.set_source_rgba(*p["primary_color"], 0.25)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + pw - 100, cur_y + 43)
        cr.show_text(m["badge"])

        cur_y += 94

    b_y = cur_y + 4
    rounded_rect(cr, px + 20, b_y, pw - 40, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1.2)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(1.0, 0.8, 0.95)
    cr.move_to(px + 38, b_y + 32)
    cr.show_text("Campaign Blueprint: Strategy, Copywriting, Community Building")

def draw_saas_dev_content(cr, px, py, pw, ph, p):
    stack = [
        {"title": "Next.js 16 + React 19", "desc": "App Router, Turbopack, Server Actions", "badge": "CORE"},
        {"title": "Supabase + PostgreSQL", "desc": "Row Level Security, Auth, Edge Functions", "badge": "DATA"},
        {"title": "Tailwind CSS v4 + TypeScript", "desc": "Zero runtime overhead, strict type safety", "badge": "UI"},
    ]
    cur_y = py + 72
    for s in stack:
        rounded_rect(cr, px + 20, cur_y, pw - 40, 80, 12)
        cr.set_source_rgba(0.08, 0.16, 0.20, 0.75)
        cr.fill_preserve()
        cr.set_source_rgba(*p["primary_color"], 0.4)
        cr.set_line_width(1)
        cr.stroke()

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(13.5)
        cr.set_source_rgb(0.9, 0.98, 1.0)
        cr.move_to(px + 38, cur_y + 30)
        cr.show_text(s["title"])

        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(12)
        cr.set_source_rgba(0.7, 0.85, 0.9, 0.9)
        cr.move_to(px + 38, cur_y + 52)
        cr.show_text(s["desc"])

        rounded_rect(cr, px + pw - 90, cur_y + 26, 60, 26, 6)
        cr.set_source_rgba(*p["primary_color"], 0.25)
        cr.fill()
        cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        cr.set_font_size(10.5)
        cr.set_source_rgb(*p["secondary_color"])
        cr.move_to(px + pw - 78, cur_y + 43)
        cr.show_text(s["badge"])

        cur_y += 94

    b_y = cur_y + 4
    rounded_rect(cr, px + 20, b_y, pw - 40, 52, 10)
    cr.set_source_rgba(*p["primary_color"], 0.2)
    cr.fill_preserve()
    cr.set_source_rgb(*p["primary_color"])
    cr.set_line_width(1.2)
    cr.stroke()
    cr.select_font_face("DejaVu Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(13.5)
    cr.set_source_rgb(0.7, 0.95, 1.0)
    cr.move_to(px + 38, b_y + 32)
    cr.show_text("Architecture: 100/100 Lighthouse Performance & Scalable Code")

def generate_cover_for_item(item):
    slug = item["slug"]
    is_service = item.get("is_service", False)

    if is_service:
        services_dir = "public/images/services"
        os.makedirs(services_dir, exist_ok=True)
        out_path = f"{services_dir}/{slug}.png"
    else:
        content_dir = f"content/blog/{slug}/images"
        public_dir = f"public/content/blog/{slug}/images"
        os.makedirs(content_dir, exist_ok=True)
        os.makedirs(public_dir, exist_ok=True)
        content_path = f"{content_dir}/cover.png"
        out_path = f"{public_dir}/cover.png"

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, WIDTH, HEIGHT)
    cr = cairo.Context(surface)

    draw_background(cr, item)
    draw_header_and_title(cr, item)
    draw_visual_panel(cr, item)

    if not is_service:
        surface.write_to_png(content_path)
    surface.write_to_png(out_path)
    print(f"Generated cover for: {slug} -> {out_path}")

def main():
    print(f"Generating {len(POSTS)} cover images (blogs & services)...")
    for item in POSTS:
        generate_cover_for_item(item)
    print("All cover images generated successfully!")

if __name__ == "__main__":
    main()
