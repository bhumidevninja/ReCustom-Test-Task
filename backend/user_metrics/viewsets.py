from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import HttpResponse
from .models import User, ActivityLog
from .serializers import UserSerializer, ActivityLogSerializer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.pdfgen import canvas

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # @action(detail=True, methods=['get'])
    # def download_pdf(self, request, pk=None):
    #     user = self.get_object() 
    #     response = HttpResponse(content_type='application/pdf')
    #     response['Content-Disposition'] = f'attachment; filename="User_{user.name}_Report.pdf"'

    #     p = canvas.Canvas(response, pagesize=letter)
        
    #     p.setFont("Helvetica-Bold", 16)
    #     p.drawString(100, 750, f"User Report for {user.name}")

    #     p.setFont("Helvetica", 12)
    #     p.drawString(100, 730, f"Email: {user.email}")
    #     p.drawString(100, 710, f"Role: {user.role}")

    #     p.setFont("Helvetica-Bold", 12)
    #     p.drawString(100, 690, f"Total Logins: {user.activity_logs.filter(activity_type='login').count()}")
    #     p.drawString(100, 670, f"Total Downloads: {user.activity_logs.filter(activity_type='download').count()}")

    #     p.drawString(100, 650, "Recent Activities:")
        
    #     data = [["Timestamp", "Activity"]]
    #     for log in user.activity_logs.all()[:5]:
    #         data.append([log.timestamp.strftime('%Y-%m-%d %H:%M:%S'), log.activity_type.capitalize()])

    #     table = Table(data, colWidths=[200, 200], rowHeights=25)
    #     table.setStyle(TableStyle([
    #         ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    #         ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    #         ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    #         ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    #         ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
    #         ('FONTSIZE', (0, 0), (-1, 0), 10),
    #         ('FONTSIZE', (0, 1), (-1, -1), 9),
    #         ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    #         ('GRID', (0, 0), (-1, -1), 1, colors.black),
    #     ]))

    #     table.wrapOn(p, 100, 490)
    #     table.drawOn(p, 100, 490)

    #     p.showPage()
    #     p.save()

    #     return response

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        user = self.get_object()
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="User_{user.name}_Report.pdf"'

        p = canvas.Canvas(response, pagesize=letter)
        width, height = letter
        margin = 40
        p.setStrokeColor(colors.grey)
        p.setLineWidth(2)
        p.rect(margin, margin, width - 2 * margin, height - 2 * margin, stroke=1, fill=0)

        p.setFont("Helvetica-Bold", 20)
        p.drawCentredString(width / 2, height - margin - 30, f"{user.name}'s Activity Report")

        p.setFont("Helvetica", 12)
        p.drawString(margin + 30, height - margin - 60, f"Email: {user.email}")
        p.drawRightString(width - margin - 30, height - margin - 60, f"Role: {user.role}")

        p.setFont("Helvetica-Bold", 14)
        p.drawString(margin + 30, height - margin - 100, "Recent Activities:")

        data = [["Timestamp", "Activity"]]
        for log in user.activity_logs.all()[:5]:
            data.append([log.timestamp.strftime('%Y-%m-%d %H:%M:%S'), log.activity_type.capitalize()])

        table = Table(data, colWidths=[3 * inch, 3 * inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.darkseagreen),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.lightgrey]),
        ]))

        table_width, table_height = table.wrap(0, 0)
        table.drawOn(p, margin + 50, height - margin - 120 - table_height)

        y_position = height - margin - 150 - table_height
        p.setFont("Helvetica-Bold", 12)
        p.drawString(margin + 30, y_position, f"Total Logins: {user.activity_logs.filter(activity_type='login').count()}")
        p.drawRightString(width - margin - 30, y_position, f"Total Downloads: {user.activity_logs.filter(activity_type='download').count()}")

        p.showPage()
        p.save()

        return response

class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
