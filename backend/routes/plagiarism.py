from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.check import PlagiarismCheck
from services.plagiarism_checker import check_plagiarism
from app import db

bp = Blueprint('plagiarism', __name__, url_prefix='/plagiarism')

@bp.route('/check', methods=['POST'])
@jwt_required()
def check():
    data = request.get_json()
    text = data['text']
    urls = data['urls']
    
    result = check_plagiarism(text, urls)
    
    check = PlagiarismCheck(user_id=get_jwt_identity(), text=text, result=result)
    db.session.add(check)
    db.session.commit()
    
    return jsonify(result), 200

@bp.route('/history', methods=['GET'])
@jwt_required()
def history():
    checks = PlagiarismCheck.query.filter_by(user_id=get_jwt_identity()).order_by(PlagiarismCheck.timestamp.desc()).all()
    return jsonify([{
        'id': check.id,
        'text': check.text[:100] + '...',
        'result': check.result,
        'timestamp': check.timestamp.isoformat()
    } for check in checks]), 200